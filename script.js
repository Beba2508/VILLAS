console.log("✅ script.js is loaded");

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
    arrival: "2025-07-24",
    guest: "Ivan Horvat",
  },
  {
    villa: "Noble Villas",
    unit: "Villa Stella",
    channel: "Airbnb",
    id: 123458,
    arrival: "2025-07-22",
    guest: "Petra Kovač",
  }
];

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
}

function renderTable(data) {
  const container = document.querySelector("body");
  container.innerHTML = "<h1>🐐 VILLE REZERVACIJE 🐐</h1>";

  // ➕ Opis
  const description = document.createElement("p");
  description.textContent = "Ovo je tablica sa svim dolascima u Ville za potrebe koordinacije H&C tima. Emoji koze je tu jer Beba voli koze.";
  description.style.marginBottom = "20px";
  container.appendChild(description);

  // ➕ Gumb za čišćenje
  const button = document.createElement("a");
  button.href = "https://irundo.com/rentlioapi/Villas_checkin_out.php";
  button.textContent = "🧼 Raspored čišćenja za ville";
  button.target = "_blank";
  button.style.display = "inline-block";
  button.style.padding = "10px 20px";
  button.style.marginBottom = "30px";
  button.style.backgroundColor = "#ffb6d9";
  button.style.color = "#1e1e2f";
  button.style.textDecoration = "none";
  button.style.borderRadius = "8px";
  button.style.fontWeight = "bold";
  container.appendChild(button);

  // Grupiraj po vili
  const grouped = {};
  data.forEach(r => {
    if (!grouped[r.villa]) grouped[r.villa] = [];
    grouped[r.villa].push(r);
  });

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
          <th>Tourist tax</th>
          <th>Dodatne usluge</th>
          <th>Naplata usluga</th>
          <th>Host</th>
          <th>Host kontaktiran?</th>
          <th>Broj sati check-ina</th>
          <th>Priprema za gosta</th>
          <th>✔</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    grouped[villaName]
      .sort((a, b) => new Date(a.arrival) - new Date(b.arrival))
      .forEach(r => {
        const row = document.createElement("tr");
        const arrivalFormatted = formatDate(r.arrival);
        // 1) Ako je Villa Lidija, default host = Daniela
const isLidija = r.villa === "Villa Lidija";
const hostDefault = isLidija ? "Daniela" : "";

// 2) Ako je jedna od ovih vila, Damage deposit = "ima"
const alwaysImaDeposit = ["Tie Vižinada Villa", "Bronzees Villas", "OLA Luxury Apartment"].includes(r.villa);
const depositDefault = alwaysImaDeposit ? "ima" : "";

// 4) Ako kanal nije definiran (prazan), možemo ga ručno upisati
const channelEditable = r.channel || "";

// 5) Ako kanal nije Booking.com ili Airbnb → priprema za gosta = "trebamo naplatiti CF"
const needsCF = r.channel !== "Booking.com" && r.channel !== "Airbnb";
const prepDefault = needsCF ? "trebamo naplatiti CF" : "";


        row.innerHTML = `
          <td>${r.unit}</td>
          <td><input type="text" value="${channelEditable}" placeholder="Kanal prodaje" /></td>
          <td>${r.id}</td>
          <td>${arrivalFormatted}</td>
          <td>${r.guest}</td>
          <td><input type="time" /></td>
         <td>
  <select>
    <option value="" ${depositDefault === "" ? "selected" : ""}>--</option>
    <option ${depositDefault === "ima" ? "selected" : ""}>ima</option>
    <option>nema</option>
    <option>naplaćeno</option>
  </select>
</td>
          <td>
            <select><option value="">--</option><option>ima</option><option>nema</option><option>naplaćeno</option></select>
          </td>
          <td><input type="text" placeholder="€" /></td>
          <td>
            <select><option value="">--</option><option>nema</option><option>naplaćeno</option><option>treba naplatiti</option></select>
          </td>
          <td><input type="text" placeholder="Ime hosta" value="${hostDefault}" /></td>
          <td>
            <select><option value="">--</option><option>YES</option><option>NO</option></select>
          </td>
          <td><input type="number" min="0" placeholder="sati" /></td>
          <td><input type="text" placeholder="Napomena" value="${prepDefault}" /></td>
          <td><input type="checkbox" class="done-checkbox" /></td>
        `;

        const checkbox = row.querySelector(".done-checkbox");
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            row.style.backgroundColor = "#2d4833"; // zelenkasta
          } else {
            row.style.backgroundColor = "";
          }

          // Live ažuriranje statistike
          const updatedDone = document.querySelectorAll(".done-checkbox:checked").length;
          document.getElementById("done-count").textContent = updatedDone;
        });

        tbody.appendChild(row);
      });

    const wrapper = document.createElement("div");
    wrapper.className = "table-wrapper";
    wrapper.appendChild(table);
    section.appendChild(wrapper);
    container.appendChild(section);
  });

  // ➕ Statistika
  const checkboxes = document.querySelectorAll(".done-checkbox");
  const total = checkboxes.length;
  const done = document.querySelectorAll(".done-checkbox:checked").length;

  const stats = document.createElement("p");
  stats.innerHTML = `🔢 <strong>Ukupno dolazaka:</strong> ${total} &nbsp;&nbsp; ✅ <strong>Odrađeno:</strong> <span id="done-count">${done}</span>`;
  stats.style.marginTop = "30px";
  stats.style.fontSize = "16px";
  container.appendChild(stats);
}

renderTable(reservationData);
