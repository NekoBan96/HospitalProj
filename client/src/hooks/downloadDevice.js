import axios from 'axios';

export function downloadDevice() {
  const download = async (id) => {
    try {
      const response = await axios.get('http://localhost:5000/upload/download', {
        params: { id },
        method: 'GET',
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return url;
    } catch (error) {
      console.error('Ошибка при скачивании файла:', error);
    }
  };

  return {
    download,
  };
}