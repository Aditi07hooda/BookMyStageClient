"use client";
import useGlobalContext from "@/hooks/use-context";
import React, { useState } from "react";

const MyProfile = () => {
  const { user } = useGlobalContext();
  const allEvents: Array<string> = [
    "Dance",
    "Singing",
    "Drama",
    "Painting",
    "Photography",
    "Kids talent hunt",
    "Singing competition",
  ];
  const [selectedEvent, setSelectedEvent] = useState("");
  const [eligibleEvents, setEligibleEvents] = useState<String[]>(
    user?.eligibleEvents || []
  );

  const handleAddEvent = async () => {
    if (selectedEvent && !eligibleEvents.includes(selectedEvent)) {
      setEligibleEvents([...eligibleEvents, selectedEvent]);
      setSelectedEvent("");

      try {
        const res = await fetch (`${process.env.BASE_URL}evaluator/set-eligible-events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?._id,
            eligibleEventsFromUser: [...eligibleEvents, selectedEvent]
          })
        });
        const data = await res.json();
        if (data.success) {
          setEligibleEvents(data.eligibleEvents);
        }
      } catch (error) {
        console.error("Error updating eligible events:", error);
      }
    }
  };

  return (
    <>
      <ul className="student-profile-info">
        <li>
          <h5>Registration Date :</h5>
          <span>{user?.date}</span>
        </li>
        <li>
          <h5>First Name :</h5>
          <span className="text-capitalize">{user?.name}</span>
        </li>

        <li>
          <h5>Email :</h5>
          <span> {user?.email} </span>
        </li>
        <li>
          <h5>Phone :</h5>
          <span> {user?.phone ? user?.phone : "No Contact"} </span>
        </li>
        <li>
          <h5>Gender :</h5>
          <span>{user?.gender ? user?.gender : "No Gender Set"}</span>
        </li>
        {user?.evaluator && (
          <li>
            <h5>Evaluator:</h5>
            <div className="">
              <p className="fw-semibold">
                Eligible for events –{" "}
                {eligibleEvents?.join(", ") || "No Events"}
              </p>

              <div className="d-flex align-items-center gap-2 mt-2">
                <select
                  className="form-select"
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                >
                  <option value="">Select an event</option>
                  {allEvents.map((event) => (
                    <option key={event} value={event}>
                      {event}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleAddEvent()}
                >
                  Add
                </button>
              </div>
            </div>
          </li>
        )}
      </ul>
    </>
  );
};

export default MyProfile;
