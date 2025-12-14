#!/bin/bash

# Directories
INPUT_DIR="./uploads"
START_END="./start_end"
OUTPUT_BASE_DIR="./youtube_ready"
TEMP_BASE="/tmp/start_end_temp"

# Ensure the output base directory exists
mkdir -p "$OUTPUT_BASE_DIR"

# Check for the existence of start and end files
START_FILE="$START_END/start.mp4"
END_FILE="$START_END/end.mp4"

if [[ ! -f "$START_FILE" ]]; then
  echo "Error: File not found: $START_FILE"
  exit 1
fi

if [[ ! -f "$END_FILE" ]]; then
  echo "Error: File not found: $END_FILE"
  exit 1
fi

# Function to ensure compatibility of video format
convert_if_needed() {
  local input_file=$1
  local output_file=$2

  # Check if input file is already in a compatible format
  ffmpeg -i "$input_file" -c copy -f mp4 -t 1 -y /dev/null 2>/dev/null
  if [[ $? -ne 0 ]]; then
    echo "Converting $input_file to a compatible format..."
    ffmpeg -y -i "$input_file" -c:v libx264 -c:a aac -strict experimental "$output_file"
  else
    cp "$input_file" "$output_file"
  fi
}

# Convert start and end videos once
mkdir -p "$TEMP_BASE"
START_CONVERTED="$TEMP_BASE/start.mp4"
END_CONVERTED="$TEMP_BASE/end.mp4"

convert_if_needed "$START_FILE" "$START_CONVERTED"
convert_if_needed "$END_FILE" "$END_CONVERTED"

# Initialize logging variables
total_processed=0
total_failed=0
log_summary="Processing Summary:\n"

# Loop through each subdirectory inside INPUT_DIR
for folder in "$INPUT_DIR"/*; do
  if [[ -d "$folder" ]]; then
    folder_name=$(basename "$folder")
    OUTPUT_DIR="$OUTPUT_BASE_DIR/$folder_name"

    # Create output directory if it doesn't exist
    mkdir -p "$OUTPUT_DIR"

    folder_processed=0
    folder_failed=0
    folder_log="Folder: $folder_name\n"

    # Process each video file in the subdirectory
    for video in "$folder"/*.mp4; do
      [[ -f "$video" ]] || continue  # Skip if no .mp4 files exist

      base_name=$(basename "$video")
      output_file="$OUTPUT_DIR/$base_name"

      # Create a temporary directory for this video
      TEMP_DIR="$TEMP_BASE/$folder_name"
      mkdir -p "$TEMP_DIR"

      VIDEO_CONVERTED="$TEMP_DIR/video.mp4"

      # Convert input video if needed
      convert_if_needed "$video" "$VIDEO_CONVERTED"

      # Create file list for concatenation
      FILELIST="$TEMP_DIR/filelist.txt"
      {
        echo "file '$START_CONVERTED'"
        echo "file '$VIDEO_CONVERTED'"
        echo "file '$END_CONVERTED'"
      } > "$FILELIST"

      # Use ffmpeg to concatenate videos
      ffmpeg -y -f concat -safe 0 -i "$FILELIST" -c copy "$output_file" > /dev/null 2>&1

      # Check if the output file was created successfully
      if [[ -f "$output_file" ]]; then
        folder_log+="  ✔ Processed: $base_name\n"
        ((folder_processed++))
        ((total_processed++))
      else
        folder_log+="  ✘ Failed: $base_name\n"
        ((folder_failed++))
        ((total_failed++))
      fi

      # Clean up temporary files
      rm -rf "$TEMP_DIR"
    done

    # Add folder summary to log
    folder_log+="  Total processed: $folder_processed\n"
    folder_log+="  Total failed: $folder_failed\n\n"
    log_summary+="$folder_log"
  fi
done

# Clean up temporary base directory
rm -rf "$TEMP_BASE"

# Final summary
log_summary+="Overall Summary:\n"
log_summary+="  Total videos processed: $total_processed\n"
log_summary+="  Total videos failed: $total_failed\n"

# Print log
echo -e "$log_summary"

# Save log to a file
echo -e "$log_summary" > process_log.txt

echo "All processing complete. Log saved to process_log.txt."
