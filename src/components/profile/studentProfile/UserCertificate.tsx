"use client";

import useGlobalContext from "@/hooks/use-context";
import { Download } from "lucide-react"; // Import download icon
import React, { useEffect, useState } from "react";

interface Certificate {
  eventimg: string | undefined;
  eventid: string;
  eventName: string;
  certificate: string;
}

const UserCertificate = () => {
  const { user } = useGlobalContext();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const userEmail = user?.email;
  const [isCertificatePresent, setIsCertificatePresent] = useState<Boolean>();

  useEffect(() => {
    async function fetchCertificates() {
      if (!userEmail) return;
      const BASE_URL = process.env.BASE_URL;
      if (!BASE_URL) {
        console.error("BASE_URL is not set in environment variables");
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}pdf/user-certificates/${encodeURIComponent(userEmail)}`
        );
       
        if (!response.ok) {
          setCertificates([]);
          setIsCertificatePresent(false);
          return;
        }

        const data = await response.json();
        console.log("Fetched Certificates:", data); // Debugging log

        if(!data.certificates) {
          setIsCertificatePresent(false);
          setCertificates([]);
        }

        setCertificates(data.certificates || []);
      } catch (error) {
        console.error("Error fetching certificates:", error);
        setIsCertificatePresent(false);
        setCertificates([]); // Handle API failure properly
      }
    }

    fetchCertificates();
  }, [userEmail]); // ✅ Calls fetchCertificates when userEmail changes

  return (
    <>
    {!isCertificatePresent ? (
      <div className="text-bg-info p-2">
        No Certificates found
      </div>
    ) : (
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {certificates.length > 0 ? (
          certificates.map((cert, index) =>
            cert.certificate ? (
              <div key={index} style={{ textAlign: "center" }}>
                <iframe src={cert.eventimg} width="100%" height="auto" />
                <br />
                <a
                  href={cert.certificate}
                  download={`certificate-${index + 1}.pdf`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                    color: "#007bff",
                    fontWeight: "bold",
                  }}
                >
                  <Download size={20} /> {/* Download icon */}
                  {cert?.eventName} <br />({cert?.eventid})
                </a>
              </div>
            ) : (
              <p key={index}>Invalid Certificate Data</p>
            )
          )
        ) : (
          <p>No certificates available</p>
        )}
      </div>
    )}
    </>
  );
};

export default UserCertificate;
