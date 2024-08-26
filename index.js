//CARGA DE EXCEL

const archivo = "files/SAM.xlsx";
const buscar = document.querySelector(".buscar");
const borrar = document.querySelector(".borrar");

fetch(archivo)
  .then((response) => response.arrayBuffer())
  .then((data) => {
    const workbook = XLSX.read(data, { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    window.excelData = XLSX.utils.sheet_to_json(firstSheet);
  })
  .catch((error) => console.error("Error al cargar el archivo Excel:", error));

buscar.addEventListener("click", () => {
  const inputSAM = document.querySelector(".SAM").value;
  const resultElement = document.querySelector("#result");
  console.log(window.excelData);

  if (!window.excelData) {
    resultElement.textContent = "El archivo Excel no está cargado aún.";
    return;
  }

  const row = window.excelData.find((row) => row["Nro. SAM"] === inputSAM);

  if (row) {
    resultElement.textContent = `El PIN del SAM es: ${row["PIN"]}`;
  } else {
    resultElement.textContent = "No se encontró el valor en el archivo.";
  }
});

borrar.addEventListener("click", () => {
  const inputSAM = (document.querySelector(".SAM").value = "");
});
