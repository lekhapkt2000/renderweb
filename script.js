const apiUrl = 'https://api.example.com/data'; // Thay thế URL này bằng URL API thật của bạn

// Lấy dữ liệu từ API và hiển thị
document.getElementById('getDataBtn').addEventListener('click', () => {
  axios.get(apiUrl)
    .then(response => {
      const dataDisplay = document.getElementById('dataDisplay');
      dataDisplay.innerHTML = ''; // Xóa nội dung cũ

      response.data.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
          ID: ${item.id} - Name: ${item.name}
          <button onclick="editItem(${item.id}, '${item.name}')">Edit</button>
          <button onclick="deleteItem(${item.id})">Delete</button>
        `;
        dataDisplay.appendChild(div);
      });
    })
    .catch(error => console.error('Error:', error));
});

// Thêm dữ liệu mới
document.getElementById('addItemBtn').addEventListener('click', () => {
  const newItemName = document.getElementById('newItemName').value;
  axios.post(apiUrl, { name: newItemName })
    .then(response => {
      alert('Item added successfully!');
      document.getElementById('newItemName').value = ''; // Xóa nội dung input
    })
    .catch(error => console.error('Error:', error));
});

// Chỉnh sửa dữ liệu
function editItem(id, currentName) {
  const newName = prompt('Enter new name', currentName);
  if (newName) {
    axios.put(`${apiUrl}/${id}`, { name: newName })
      .then(response => {
        alert('Item updated successfully!');
      })
      .catch(error => console.error('Error:', error));
  }
}

// Xóa dữ liệu
function deleteItem(id) {
  if (confirm('Are you sure you want to delete this item?')) {
    axios.delete(`${apiUrl}/${id}`)
      .then(response => {
        alert('Item deleted successfully!');
      })
      .catch(error => console.error('Error:', error));
  }
}
