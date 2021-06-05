<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <form class="w-96 bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200" @submit.prevent="login">
    <div class="px-4 py-3 sm:px-6">
      <h3 class="font-bold text-base text-gray-700">Welcome to your Dashboard</h3>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <div class="mt-1">
          <input
            id="email"
            v-model="formData.email"
            type="email"
            name="email"
            autofocus="autofocus"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="you@example.com"
          />
          <span v-if="submitted && formData.email === ''" class="text-red-600 text-sm">Please fill your email</span>
        </div>
      </div>
      <div class="mt-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <div class="mt-1">
          <input
            id="password"
            v-model="formData.password"
            type="password"
            name="password"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="your password"
          />
          <span v-if="submitted && formData.password === ''" class="text-red-600 text-sm">Please fill your password</span>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button
          type="submit"
          class="
            inline-flex
            items-center
            px-3.5
            py-2
            border border-transparent
            text-sm
            leading-4
            font-medium
            rounded-full
            shadow-sm
            text-white
            bg-indigo-600
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          "
        >
          Log In
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      submitted: false,
      formData: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      this.submitted = true;
      if (this.formData.email !== '' && this.formData.password !== '') {
        await axios.post('/api/login');
        this.submitted = false;
        this.formData.email = '';
        this.formData.password = '';
      }
    },
  },
};
</script>
