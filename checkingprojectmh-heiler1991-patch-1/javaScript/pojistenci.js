export default class Pojisteni {
  constructor() {
    this.seznamPojistencu =
      JSON.parse(localStorage.getItem("seznamPojistencu")) || [];
    this.inputJmeno = document.getElementById("inputJmeno");
    this.inputPrijmeni = document.getElementById("inputPrijmeni");
    this.inputVek = document.getElementById("inputVek");
    this.inputTel = document.getElementById("inputTel");
    this.buttonUloz = document.getElementById("buttonUloz");
    this.seznamPojistencuTable = document.querySelector(
      "#seznamPojistencu tbody"
    );

    this.buttonUloz.addEventListener("click", this.pridejPojistenec.bind(this));
  }

  ulozPojistenceDoLocalStorage() {
    localStorage.setItem(
      "seznamPojistencu",
      JSON.stringify(this.seznamPojistencu)
    );
  }

  pridejPojistenec() {
    const jmeno = this.inputJmeno.value;
    const prijmeni = this.inputPrijmeni.value;
    const vek = this.inputVek.value;
    const tel = this.inputTel.value;

    if (jmeno === "" || prijmeni === "" || vek === "" || tel === "") {
      alert("Musíte vyplnit všechna pole.");
      return;
    }

    const pojistenec = { jmeno, prijmeni, vek, tel };
    this.seznamPojistencu.push(pojistenec);
    this.ulozPojistenceDoLocalStorage();
    this.vypisPojistence();
    this.inputJmeno.value = "";
    this.inputPrijmeni.value = "";
    this.inputVek.value = "";
    this.inputTel.value = "";
  }

  smazPojistenec(pojistenec) {
    if (confirm("Opravdu odstranit?")) {
      const index = this.seznamPojistencu.indexOf(pojistenec);
      if (index !== -1) {
        this.seznamPojistencu.splice(index, 1);
        this.ulozPojistenceDoLocalStorage();
        this.vypisPojistence();
      }
    }
  }

  vypisPojistence() {
    this.seznamPojistencuTable.innerHTML = "";

    for (const pojistenec of this.seznamPojistencu) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${pojistenec.jmeno}</td><td>${pojistenec.prijmeni}</td><td>${pojistenec.tel}</td><td>${pojistenec.vek}</td>`;

      const smazBtnTd = document.createElement("td");
      const smazBtn = document.createElement("button");
      smazBtn.textContent = "Smazat pojištěnce";
      smazBtn.className = "btn btn-light";

      smazBtn.addEventListener("click", () => {
        this.smazPojistenec(pojistenec);
      });

      smazBtnTd.appendChild(smazBtn);
      tr.appendChild(smazBtnTd);

      this.seznamPojistencuTable.appendChild(tr);
    }
  }
}
const pojisteni = new Pojisteni();
