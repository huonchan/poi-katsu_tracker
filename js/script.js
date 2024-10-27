const inputText = document.getElementById("inputText");
const saveButton = document.getElementById("saveButton");
const displayButton = document.getElementById("displayButton");

saveButton.addEventListener("click", () => {
  const text = inputText.value;
  localStorage.setItem("savedText", text);
  alert("文字列を保存しました");
});

displayButton.addEventListener("click", () => {
  const savedText = localStorage.getItem("savedText");
  if (savedText) {
    alert(savedText);
  } else {
    alert("保存された文字列がありません");
  }
});