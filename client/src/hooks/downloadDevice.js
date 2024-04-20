import axios from "axios";

export function downloadDevice() {
  const download = async (id) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/upload/download",
        {
          responseType: "arraybuffer",
          params: { id },
        }
      );
      const text = response.statusText;
      const contentType = response.headers['content-type'];
      console.log(contentType.split(".")[1]);
      const blob = new Blob([response.data], {
        type: contentType,
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${id}.${text.split('.')[1]}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return url;
    } catch (error) {
      console.error("Ошибка при скачивании файла:", error);
    }
  };

  return {
    download,
  };
}
