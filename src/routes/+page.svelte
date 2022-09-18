<script>
    import { goto } from "$app/navigation";
    import Footer from "$lib/components/footer/footer.svelte";
    import Typewriter from "svelte-typewriter";

    function gotoLoginPage() {
        goto("/login");
    }

    function gotoSignupPage() {
        goto("/signup");
    }
</script>

<!-- <div class="bg-image" style="
        background-image: url(https://drive.google.com/uc?id=1soJg43RIT7Mf3Q2wa5c1-G6S_LrKBMBi);
        height: 50vh;"></div> -->
<div class="header">
    <h1>Hero Cards</h1>
    <div class="description">
        <Typewriter>
            <p> 
                Hero Cards is a free to use website that allows you to easily organize
                inspirational quotes themed around your favorite heroes.
            </p>
        </Typewriter>
    </div>
</div>
<div class="buttons">
    <button id="ls" on:click={gotoLoginPage}>Login</button>
    <button id="ls" on:click={gotoSignupPage}>Sign Up</button>
</div>



<div class="info">
    <div class = "card"> 
        <div class = "card-body"  id = "boxes" >
            <h5 class ="card-title"> Create </h5>
            <p class = "card-text">Select a layout that fits best for your vision.</p> 
        </div>
    </div>
    <div class = "card">
        <div class = "card-body"  id = "boxes" >
            <h5 class ="card-title"> Design </h5>
            <p class = "card-text">Pick your own heroic background image.</p> 
        </div>
    </div>
    <div class = "card">
        <div class = "card-body"  id = "boxes" >
            <h5 class ="card-title"> Inspire </h5>
            <p class = "card-text">Pick a quote from your favorite superhero to accompany your card.</p> 
        </div>
    </div>
</div>


<Footer />

<style>
    @import url("https://fonts.googleapis.com/css2?family=Bangers&display=swap");
    @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@300&display=swap');

    :global(body) {
        /* background-color: #e69201; */
        background: url("https://wallpapercave.com/wp/wp2483329.jpg") no-repeat center center fixed; 
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        /* background-size: cover;
        background-image: url("https://wallpapercave.com/wp/wp2483329.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%; */
    }

    .header h1 {
        font-family: "Bangers", cursive;
        font-size: 100px;
        background: linear-gradient(45deg, #473f6e, #a4b0f5);
        background-clip: text;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
    }

    .header p {
        font-size: 24px;
        color: whitesmoke;
    }

    .header {
        display: flex;
        flex-direction: column;
        width: 50%;
        margin-left: 10%;
        margin-top: 10%;
    }
    
    .header .description {
        background-color: rgba(22, 82, 180, 0.6);
        height: 120px;
        padding: 5px;
        border-radius: 15px;
    }

    .info {
        margin-left: 5%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly; 
        flex-grow: 1; 
    }

    .card {
       background: linear-gradient(45deg, #002FFE, #f10808);
       width: 25%;
    }

    .card-body{
        color: black; 
        border-radius: 5px; 
    }

    .buttons{
        display: flex; 
        flex-grow: 1; 
        flex-direction: row; 
        justify-content: center; 
        width: 100%; 
        height: 300px;
    }
    
    #ls{
        font-family: Dosis, bold; 
        font-weight: 10px;
        margin-left: 5%; 
        margin-top: 5%;
        background-color: #ECEE58;
        color: black;
        width: 30%; 
        height: 15%;
        border-radius: 15px; 
        border-width: 2px; 

    }

     #boxes {
        background-color: rgba(255, 255, 255, .2);
        padding: 10px;
        margin: 5% auto;
        width: 90%;
        word-wrap: break-word;
    }
</style>
