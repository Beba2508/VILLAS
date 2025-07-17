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
  const container = document.querySelector("body");
  container.innerHTML = "<h1>🧙‍♀️ Rezervacije vila</h1>"; // reset i naslov

  // Grupiraj po vili
  const grouped = {};
  data.forEach(r => {
    if (!grouped[r.villa]) grouped[r.villa] = [];
    grouped[r.villa].push(r);
  });

  // Za svaku villu nacrtaj tablicu
  Object.keys(grouped).forEach(villaName => {
    const section = document.createElement("section");

    const heading = document.createElement("h2");
    heading.textContent = villaName;
    section.appendChild(heading);

    const table = document.createElement("table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>Jedinica</th>
          <th>Kanal</th>
          <th>Rentlio ID</th>
          <th>Datum dolaska</th>
          <th>Gost</th>
          <th>ETA</th>
          <th>Damage deposit</th>
          <th>BP</th>
          <th>Dodatne usluge</th>
          <th>Naplata usluga</th>
          <th>Host</th>
          <th>Host kontaktiran?</th>
          <th>Broj sati check-ina</th>
          <th>Priprema za gosta</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    // Sortiraj po datumu
    grouped[villaName].sort((a, b) => new Date(a.arrival) - new Date(b.arrival));

    grouped[villaName].forEach(r => {
      const row = document.createElement("tr");
      const arrivalFormatted = formatDate(r.arrival);

      row.innerHTML = `
        <td>${r.unit}</td>
        <td>${r.channel}</td>
        <td>${r.id}</td>
        <td>${arrivalFormatted}</td>
        <td>${r.guest}</td>
        <td><input type="time" /></td>
        <td>
          <select><option value="">--</option><option>ima</option><option>nema</option><option>naplaćeno</option></select>
        </td>
        <td>
          <select><option value="">--</option><option>ima</option><option>nema</option><option>naplaćeno</option></select>
        </td>
        <td><input type="text" placeholder="€" /></td>
        <td>
          <select><option value="">--</option><option>nema</option><option>naplaćeno</option><option>treba naplatiti</option></select>
        </td>
        <td><input type="text" placeholder="Ime hosta" /></td>
        <td>
          <select><option value="">--</option><option>YES</option><option>NO</option></select>
        </td>
        <td><input type="number" min="0" placeholder="sati" /></td>
        <td><input type="text" placeholder="Napomena" /></td>
      `;
      tbody.appendChild(row);
    });

    section.appendChild(table);
    container.appendChild(section);
  });
}
function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
}
