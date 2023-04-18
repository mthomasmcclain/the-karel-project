<template>
  <div class="home">
      <div class="student-header">
        <img src="https://staging.knowlearning.systems/41d23979-de11-11ed-98c5-754324f93e89" />
        <h2>{{ t('the-karel-project' )}}</h2>
      </div>

    <div class="button-w-icon" @click="$router.push('/karel-player')">
      <div class="svg-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="116.28 146.364 102.111 100.211">
          <g transform="rotate(-90 167 197)">
            <path style="stroke: rgb(0, 0, 0); stroke-width: 2px; stroke-linejoin: round; fill: rgb(119, 208, 144);" d="M 156.7 221.715 C 151.383 231.733 164.053 243.214 167.029 246.575 C 170.005 243.178 182.675 231.697 177.358 221.679"/>
            <path style="stroke: rgb(0, 0, 0); fill: rgb(119, 208, 144);" d="M 142.272 207.939 C 139.088 201.958 139.998 203.295 138.513 196.125 C 132.891 196.956 119.048 213.687 131.003 222.864 C 136.338 226.959 136.721 211.444 142.272 207.939 Z"/>
            <path style="stroke: rgb(0, 0, 0); fill: rgb(119, 208, 144);" d="M 191.476 199.146 C 188.285 206.069 188.22 207.92 185.769 212.571 C 204.014 218.498 215.766 190.569 203.088 188.271 C 195.192 186.84 201.569 199.364 191.476 199.146 Z"/>
            <path style="stroke: rgb(0, 0, 0); fill: rgb(119, 208, 144);" d="M 173.956 161.107 C 176.195 155.306 172.326 145.197 180.534 146.474 C 196.849 149.012 182.884 167.82 182.884 167.82"/>
            <path style="stroke: rgb(0, 0, 0); fill: rgb(119, 208, 144);" d="M 147.406 167.031 C 147.122 169.567 126.124 167.143 134.927 155.552 C 141.613 146.747 145.335 159.706 157.475 159.379"/>
            <path style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0);" d="M 162.678 158.154 L 167.511 158.02"/>
            <path style="stroke: rgb(0, 0, 0); fill: rgb(119, 208, 144);" d="M 162.354 158.771 C 162.017 148.21 167.662 147.957 167.999 158.518"/>
            <circle style="stroke: rgba(0, 0, 0,0.52); stroke-width: 7.37603px; fill: rgb(201, 156, 109);" cx="258.483" cy="212.276" r="61.489" transform="matrix(0.431929, 0, 0, 0.519574, 53.236794, 81.083017)"/>
          </g>
        </svg>
      </div>
      <div class="text-area">
        <span>{{ t('learner-portal') }}</span>
      </div>
    </div>


    <div class="button-w-icon" @click="$router.push('/karel-builder')">
      <div class="svg-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"         
          viewBox="0 0 385.419 385.419"
        >
          <g fill="darkgreen">
            <path d="M188.998,331.298l-0.231-107.449l-92.494-53.907L3.946,223.654l0.225,108.29l92.102,53.475L188.998,331.298z    M105.656,358.292l0.165-75.232l64.289-37.558l0.165,75.067L105.656,358.292z M96.26,191.586l64.603,37.658l-64.384,37.606   L31.874,229.05L96.26,191.586z M22.703,245.356l64.411,37.691l-0.164,75.335l-64.092-37.217L22.703,245.356z"/>
            <path d="M288.748,169.948l-92.324,53.706l0.231,108.29l92.104,53.475l92.714-54.121l-0.231-107.449L288.748,169.948z    M288.735,191.586l64.605,37.658l-64.386,37.606l-64.606-37.801L288.735,191.586z M215.179,245.356l64.404,37.691l-0.164,75.335   l-64.076-37.217L215.179,245.356z M298.137,358.292l0.159-75.232l64.289-37.558l0.164,75.067L298.137,358.292z"/>
            <path d="M285.216,53.892L192.719,0l-92.324,53.697l0.222,108.295l92.102,53.479l92.717-54.121L285.216,53.892z M192.707,21.635   l64.609,37.649l-64.384,37.619l-64.609-37.811L192.707,21.635z M119.149,75.401l64.411,37.698l-0.161,75.335l-64.095-37.211   L119.149,75.401z M202.099,188.343l0.162-75.234l64.292-37.564l0.164,75.073L202.099,188.343z"/>
          </g>
        </svg>
      </div>
      <div class="text-area">
        <span>{{ t('karel-customizer' )}}</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    t(target) { return this.$store.getters.translation(target) }
  }
}
</script> 

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.student-header
{
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: whitesmoke;
  margin-bottom: 40px;
}
.student-header img
{
  width: 70px;
}
.student-header *
{
  margin: 18px 10px;
}
.button-w-icon {
  margin: 20px;
  font-family: 'Nunito', sans-serif;
  color: darkgreen;
  display: flex;
  background: whitesmoke;
  width: 400px;
  height: 60px;
  border-radius: 12px;
  border: 2px solid lightgrey;
  cursor: pointer;
  opacity: 0.8;
}
.button-w-icon:hover {
  transform: translate(1px,1px);
  opacity: 1;
}
.svg-wrapper {
  background: rgb(197, 219, 197);
  border-radius: 12px 0 0 12px;
  width: 80px;
  height: 100%;
  
  display: flex;
  justify-content: center;
  align-items: center;
}
.svg-wrapper svg {
  width: 55%;
}
.text-area {
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center
}
.text-area span {
  font-size: 1.5rem;
  margin-left: -15px;
}


</style>
