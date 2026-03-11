const prosesHitung = (formId) => {
    let hasil = "";

    if (formId === "formKalkulator") {
        const a = validateInput("angka1");
        const b = validateInput("angka2");
        if (a === null || b === null) return;

        const operator = document.querySelector('input[name="operator"]:checked').value;
        hasil = calculate(a, b, operator);

        document.getElementById("hasilKalkulator").innerText = hasil;
    }

    if (formId === "formDinamis") {
        const jenis = document.getElementById("jenisHitung").value;
        const a = document.getElementById("input1")?.value;
        const b = document.getElementById("input2")?.value;

        switch (jenis) {
            case "kalkulator":
                const numA = validateInput("input1");
                const numB = validateInput("input2");
                if (numA === null || numB === null) return;
                hasil = calculate(numA, numB, "+");
                break;

            case "ganjilGenap":
                const numG = validateInput("input1");
                if (numG === null) return;
                hasil = (numG % 2 === 0) ? "Genap" : "Ganjil";
                break;

            case "umur":
                const numU = validateInput("input1");
                if (numU === null) return;
                const tahunSekarang = new Date().getFullYear();
                hasil = calculate(tahunSekarang, numU, "-");
                break;

            case "konversiWaktu":
                const numW = validateInput("input1");
                if (numW === null) return;
                hasil = calculate(numW, 60, "*") + " menit";
                break;
        }

        document.getElementById("hasilFormDinamis").innerText = hasil;
    }
};

// ambil semua tombol clear
const clearButtons = document.querySelectorAll(".clearBtn");

clearButtons.forEach(function(button){

    button.addEventListener("click",function(){

        // cari card tempat tombol berada
        const card = this.closest(".card");

        // ambil semua input dalam card tersebut
        const inputs = card.querySelectorAll("input");

        // kosongkan input
        inputs.forEach(function(input){
        input.value = "";
        });

        // // reset radio button
        // const radios = card.querySelectorAll("input[type=radio]");

        // radios.forEach(function(radio){
        // radio.checked = false;
        // });

        // reset result
        const result = card.querySelector(".result");

        if(result){
        result.innerText = "0";
        }

    });

});

// Fungsi validasi input
  const validateInput = (id) => {
      const value = document.getElementById(id).value;
      if (value === "") {
          alert(`Input ${id} tidak boleh kosong!`);
          return null;
      }
      if (isNaN(value)) {
          alert(`Input ${id} harus berupa angka!`);
          document.getElementById(id).value = ""; // clear hanya input salah
          return null;
      }
      return Number(value);
  };

  // Fungsi perhitungan generik
  const calculate = (a, b, operator) => {
      switch (operator) {
          case "+": return a + b;
          case "-": return a - b;
          case "*": return a * b;
          case "/": return b !== 0 ? a / b : "Tidak bisa bagi 0";
          default: return null;
      }
  };

  // Fungsi utama hitung
  const hitung = () => {
    const a = validateInput("angka1");
    const b = validateInput("angka2");

    if (a === null || b === null) return;

    // Ambil operator dari radio button yang dipilih
    const operator = document.querySelector('input[name="operator"]:checked').value;

    const hasil = calculate(a, b, operator);
    document.getElementsByClassName("resulttt").innerText = hasil;
  };

  

// Update form sesuai pilihan
const updateForm = () => {
    const jenis = document.getElementById("jenisHitung").value;
    const formDiv = document.getElementById("formInput");

    let html = "";

    switch (jenis) {
        case "kalkulator":
            html = `
                <input type="text" id="input1" placeholder="Angka 1">
                <input type="text" id="input2" placeholder="Angka 2">
            `;
            break;
        case "ganjilGenap":
            html = `<input type="text" id="input1" placeholder="Masukkan angka">`;
            break;
        case "umur":
            html = `<input type="text" id="input1" placeholder="Tahun lahir">`;
            break;
        case "konversiWaktu":
            html = `<input type="text" id="input1" placeholder="Jam">`;
            break;
    }

    formDiv.innerHTML = html;
};