<template>
  <form class="w-96 bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200" @submit.prevent="login">
    <div class="px-4 py-3 sm:px-6">
      <h3 class="font-bold text-base text-gray-700">Welcome to your Dashboard</h3>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <div v-if="error" class="bg-red-100 py-3 mb-4 text-xs text-center text-red-700"><span class="font-bold">Login Unsuccessful</span>. Please check your credentials</div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <div class="mt-1">
          <input
            id="email"
            v-model="formData.email"
            :disabled="submitting"
            type="email"
            name="email"
            autofocus="autofocus"
            :class="{ 'opacity-30': submitting }"
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
            :disabled="submitting"
            type="password"
            name="password"
            :class="{ 'opacity-30': submitting }"
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
          :class="{ 'hover:bg-opacity-50 bg-opacity-50': submitting }"
          :disabled="submitting"
        >
          <span v-if="submitting">Please wait...</span>
          <span v-else>Log In</span>
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
      submitting: false,
      error: undefined,
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
        try {
          this.submitting = true;
          await axios.post('/api/login', this.formData);
          this.formData.email = '';
          this.formData.password = '';
          this.error = undefined;
        } catch (error) {
          this.error = error;
        }
        this.submitted = false;
        this.submitting = false;
      }
    },
  },
};
</script>
