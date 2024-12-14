import React, { useState } from "react";

export const CalendarPopup = ({
  movieTitle,
  onClose,
}: {
  movieTitle: string;
  movieDescription: string;
  onClose: () => void;
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleAddToGoogleCalendar = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both a date and time.");
      return;
    }

    const startDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);
    const formatGoogleDate = (date: Date) =>
      date.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";

    const startDateFormatted = formatGoogleDate(startDateTime);
    const endDateFormatted = formatGoogleDate(endDateTime);

    const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      movieTitle
    )}&dates=${startDateFormatted}/${endDateFormatted}&details=${encodeURIComponent(
      `It's time for ${movieTitle}, head over to Filmly now ;)`
    )}&location=${encodeURIComponent("Filmly")}&sf=true&output=xml`;

    window.open(googleCalendarLink, "_blank");

    onClose()
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Set Reminder</h2>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">Select Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="p-2 border rounded"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">Select Time:</span>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="p-2 border rounded"
            />
          </label>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleAddToGoogleCalendar}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
