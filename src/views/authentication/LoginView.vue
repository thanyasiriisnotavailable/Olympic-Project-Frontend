<template>
    <div class="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-16 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          class="mx-auto h-20 w-auto"
          src="/src/assets/Login user.png"
          alt="Your Company"
        />
        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 sm:text-3xl">
          Sign in to your account
        </h2>
      </div>
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required="true"
                class="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-[#4274a3] sm:text-sm"
              />
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div class="text-sm">
                <a href="#" class="font-semibold text-[#4274a3] hover:text-[#39658e]">
                  Forgot password?
                </a>
              </div>
            </div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                class="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-[#4274a3] focus:ring-[#4274a3] sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-[#4274a3] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>
        <p class="mt-8 text-center text-sm text-gray-500">
          Not a member?
          <a href="#" class="font-semibold text-[#4274a3] hover:text-[#39658e]">
            Try to register here
          </a>
        </p>
      </div>
    </div>
  </template>
  
  