document.addEventListener('DOMContentLoaded', loadAccounts);

function loadAccounts() {
  fetch('account-management.php?action=list')
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('accountTable');
      tbody.innerHTML = data.map(acc => `
        <tr>
          <td>${acc.id}</td>
          <td>${acc.username}</td>
          <td>${acc.email}</td>
          <td>${acc.role}</td>
          <td class="actions">
            <button onclick="editAccount(${acc.id}, '${acc.username}', '${acc.email}', '${acc.role}')">Sửa</button>
            <button onclick="deleteAccount(${acc.id})">Xóa</button>
          </td>
        </tr>
      `).join('');
    });
}

function openForm() {
  document.getElementById('modalTitle').innerText = 'Thêm tài khoản';
  document.getElementById('accId').value = '';
  document.getElementById('accUsername').value = '';
  document.getElementById('accEmail').value = '';
  document.getElementById('accRole').value = 'student';
  document.getElementById('accPassword').value = '';
  document.getElementById('passwordField').style.display = 'block';
  document.getElementById('accountModal').style.display = 'flex';
}

function closeForm() {
  document.getElementById('accountModal').style.display = 'none';
}

function editAccount(id, username, email, role) {
  document.getElementById('modalTitle').innerText = 'Sửa tài khoản';
  document.getElementById('accId').value = id;
  document.getElementById('accUsername').value = username;
  document.getElementById('accEmail').value = email;
  document.getElementById('accRole').value = role;
  document.getElementById('passwordField').style.display = 'none';
  document.getElementById('accountModal').style.display = 'flex';
}

function saveAccount(event) {
  event.preventDefault();
  const id = document.getElementById('accId').value;
  const username = document.getElementById('accUsername').value;
  const email = document.getElementById('accEmail').value;
  const role = document.getElementById('accRole').value;

  const formData = new FormData();
  formData.append('username', username);
  formData.append('email', email);
  formData.append('role', role);

  let action = 'add';
  if (id) {
    action = 'edit';
    formData.append('id', id);
  } else {
    const password = document.getElementById('accPassword').value;
    formData.append('password', password);
  }

  fetch('account-management.php?action=' + action, {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(() => {
      closeForm();
      loadAccounts();
    });
}

function deleteAccount(id) {
  if (!confirm('Bạn chắc chắn muốn xóa tài khoản này?')) return;
  const formData = new FormData();
  formData.append('id', id);

  fetch('account-management.php?action=delete', {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(() => loadAccounts());
}
