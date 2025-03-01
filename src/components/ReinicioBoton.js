const ReinicioBoton = ({handleRestart, className = ''}) => {
  return (
    <button
      onClick={handleRestart}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
    >
      <svg class="h-8 w-8 text-purple-800 hover:text-purple-500" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  
    stroke-linejoin="round">  <polyline points="1 4 1 10 7 10" />  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
    </button>
  )
}
export default ReinicioBoton;