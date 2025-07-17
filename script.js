const reservationData = [
  {
    villa: "Noble Villas",
    unit: "Villa Luna",
    channel: "Booking.com",
    id: 123456,
    arrival: "2025-07-25",
    guest: "Ana Marić",
  },
  {
    villa: "Mugeba Poreč",
    unit: "Prima",
    channel: "MyLuxoria",
    id: 123457,
    arrival: "2025-07-26",
    guest: "Ivan Horvat",
  }
];

function renderTable(data) {
  const tbody = document.querySelector("#reservationTable tbody");
  tbody.innerHTML = "";

  data.forEach((r) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${r.villa}</td>
      <td>${r.unit}</td>
      <td>${r.channel}</td>
      <td>${r.id}</td>
      <td>${r.arrival}</td>
      <td>${r.guest}</td>
      <td><input type="time" /></td>
      <td>
        <select>
          <option value="">--</option>
          <option>ima</option>
          <option>nema</option>
          <option>naplaćeno</option>
        </select>
      </td>
      <td>
        <select>
          <option value="">--</option>
          <option>ima</option>
          <option>nema</option>
          <option>naplaćeno</option>
        </select>
      </td>
      <td><input type="text" placeholder="€" /></td>
      <td>
        <select>
          <option value="">--</option>
          <option>nema</option>
          <option>naplaćeno</option>
          <option>treba naplatiti</option>
        </select>
      </td>
      <td><input type="text" placeholder="Ime hosta" /></td>
      <td>
        <select>
          <option value="">--</option>
          <option>YES</option>
          <option>NO</option>
        </select>
      </td>
      <td><input type="number" min="0" placeholder="sati" /></td>
      <td><input type="text" placeholder="Napomena" /></td>
    `;

    tbody.appendChild(row);
  });
}

renderTable(reservationData);
