<template>
    <div class="bg-gray-100 px-2 text-center">
    <div class="h-screen flex flex-col justify-center items-center">
        <h1 class="text-8xl font-extrabold text-red-500">Uh-Oh!</h1>
        <p class="text-4xl font-medium text-gray-800">Internal Server Error</p> 
        <p class="text-xl text-gray-800 mt-4"> It looks like you're experiencing some network issues.
            <br>please take a breath and
            <a href="#" @click ="$router.go(-1)" 
            class="text-red-500 underline hover:text-red-800"
            >click</a> to try again.</p>
    </div>

</div>

</template>