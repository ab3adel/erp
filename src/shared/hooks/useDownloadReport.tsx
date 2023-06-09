import { useEffect, useState } from "react";

export const useDownloadReport = () => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadReport = async (
    type: "csv" | "excel" | "pdf",
    payload: {
      columns: string[];
      table_name: string;
    }
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      // Send the request to the server
      const response = await fetch(
        "https://mc.erp-backend-dev.turnsole.tech/api/export-data-grid-" + type,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download report");
      }

      const data = await response.json();
      if (data.status) {
        setDownloadUrl(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (downloadUrl) {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "report.csv";
      a.click();
      a.remove();
    }
  }, [downloadUrl]);

  return { isLoading, error, downloadReport };
};
