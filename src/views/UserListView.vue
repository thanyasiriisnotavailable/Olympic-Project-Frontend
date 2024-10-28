<template>
    <div class="min-h-screen bg-gray-100 p-8">
      <div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 class="text-2xl font-semibold text-gray-800 mb-6">User List</h1>
  
        <!-- Search Input -->
        <div class="relative mb-4">
          <input
            v-model="search"
            type="text"
            class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search users by name..."
          />
        </div>
  
        <!-- User Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr>
                <th class="border-b py-3 px-4 text-gray-600">#</th>
                <th class="border-b py-3 px-4 text-gray-600">Name</th>
                <th class="border-b py-3 px-4 text-gray-600">Email</th>
                <th class="border-b py-3 px-4 text-gray-600">Role</th>
                <th class="border-b py-3 px-4 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(user, index) in filteredUsers"
                :key="user.id"
                class="hover:bg-gray-50"
              >
                <td class="border-b py-3 px-4">{{ index + 1 }}</td>
                <td class="border-b py-3 px-4">{{ user.name }}</td>
                <td class="border-b py-3 px-4">{{ user.email }}</td>
                <td class="border-b py-3 px-4">{{ user.role }}</td>
                <td class="border-b py-3 px-4">
                  <button
                    @click="editUser(user)"
                    class="px-4 py-1 mr-2 text-sm bg-yellow-400 text-white rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteUser(user.id)"
                    class="px-4 py-1 text-sm bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="filteredUsers.length === 0">
                <td colspan="5" class="text-center py-3 text-gray-500">
                  No users found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Edit User Modal -->
        <div v-if="editingUser" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div class="bg-white rounded-lg p-6 w-1/3">
            <h2 class="text-xl font-semibold mb-4">Edit User</h2>
            <input
              v-model="editingUser.name"
              type="text"
              class="w-full mb-4 px-4 py-2 border rounded-lg"
              placeholder="Name"
            />
            <input
              v-model="editingUser.email"
              type="email"
              class="w-full mb-4 px-4 py-2 border rounded-lg"
              placeholder="Email"
            />
            <select v-model="editingUser.role" class="w-full mb-4 px-4 py-2 border rounded-lg">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <input
              v-model="editingUser.password"
              type="password"
              class="w-full mb-4 px-4 py-2 border rounded-lg"
              placeholder="Password"
            />
            <div class="flex justify-end">
              <button @click="updateUser" class="px-4 py-1 mr-2 bg-blue-500 text-white rounded-md">Save</button>
              <button @click="closeEdit" class="px-4 py-1 bg-gray-300 rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: '',
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', password: '123456' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', password: 'abcdef' },
          { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'user', password: 'qwerty' },
        ],
        editingUser: null, // For tracking the user being edited
      };
    },
    computed: {
      filteredUsers() {
        return this.users.filter((user) =>
          user.name.toLowerCase().includes(this.search.toLowerCase())
        );
      },
    },
    methods: {
      editUser(user) {
        this.editingUser = { ...user }; // Make a copy for editing
      },
      deleteUser(userId) {
        this.users = this.users.filter((user) => user.id !== userId);
      },
      updateUser() {
        const index = this.users.findIndex((user) => user.id === this.editingUser.id);
        if (index !== -1) {
          this.users[index] = { ...this.editingUser }; // Update the user in the list
        }
        this.closeEdit();
      },
      closeEdit() {
        this.editingUser = null; // Close the edit modal
      },
    },
  };
  </script>
  
  <style scoped>
  /* Additional CSS styling if needed */
  </style>
  