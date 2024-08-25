<template>
    <div>
      <h2>Manage Updates & Notices</h2>
      <form @submit.prevent="submitUpdate">
        <textarea v-model="newUpdateMessage" placeholder="Enter new update"></textarea>
        <button type="submit">Submit</button>
      </form>
  
      <h2>Manage Subjects</h2>
      <ul>
        <li v-for="subject in subjects" :key="subject._id">
          {{ subject.name }} (Likes: {{ subject.likes }}, Rating: {{ subject.rating }})
          <form @submit.prevent="updateSubject(subject._id)">
            <input v-model="subject.name" />
            <button type="submit">Update</button>
          </form>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newUpdateMessage: '',
        subjects: [],
      };
    },
    created() {
      this.fetchSubjects();
    },
    methods: {
      async fetchSubjects() {
        const response = await fetch('http://localhost:3000/subjects');
        this.subjects = await response.json();
      },
      async submitUpdate() {
        await fetch('http://localhost:3000/updates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: this.newUpdateMessage }),
        });
        this.newUpdateMessage = '';
      },
      async updateSubject(id) {
        const subject = this.subjects.find(sub => sub._id === id);
        await fetch(`http://localhost:3000/subjects/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subject),
        });
      },
    },
  };
  </script>
  
  <style>
  /* Add your admin panel styles here */
  </style>
  