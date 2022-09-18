
<script>
    import App from "../fb";
    import { getStorage, ref, uploadBytes } from "firebase/storage";
    import { onMount } from "svelte";
    import { getAuth } from "firebase/auth";
    import { query, ref as refData, set } from "firebase/database";
    import { addDoc, collection, getFirestore, onSnapshot } from "firebase/firestore";
    import { goto } from "$app/navigation";
    import { v4 } from 'uuid';
    import Card from '$lib/components/cardswiper/card.svelte';
    import { Swiper, SwiperSlide } from 'swiper/svelte';
    import { Pagination, Navigation } from "swiper";
    import 'swiper/css';
    import "swiper/css/pagination";
    import "swiper/css/navigation";

    const storage = getStorage(App);
    const auth = getAuth();
    const db = getFirestore(App);
    let swiper;
    let uid;
    let colors = [
        "#e11414",
        "#731b2f",
        "#765986",
        "#eac191",
        "#bf767f",
        "#609291",
        "#20819d",
        "#080a09"
    ]
    let curColor = "#ffffff";
    let cardList = [];

    function randomColor() {
        // Pick random color that is not curColor
        let newColor = colors[Math.floor(Math.random() * colors.length)];
        while (newColor == curColor) {
            newColor = colors[Math.floor(Math.random() * colors.length)];
        }
        curColor = newColor;
    }

    // onMount
    onMount(() => {
        typeof localStorage !== 'undefined';
        uid = localStorage.getItem("uid") || auth.currentUser.uid;
        readCards();
        console.log(uid);
        console.log(cardList);
    });

    function signoutUser() {
        auth.signOut().then(() => {
            localStorage.removeItem("uid");
            goto("/");
        });
    }

    function uploadCard() {
        let author = document.getElementById("author").value;
        let quote = document.getElementById("quote").value;
        let file = document.getElementById("cardFile").files[0];
        // const userRef = refData(db, `users/${auth.currentUser.uid}/`);
        // // ${auth.currentUser.uid}/`
        // const newCardRef = push(userRef);
        
        let fileName;
        if (file) {
            fileName = "images/" + v4() + file.name;
            let fileRef = ref(storage, fileName);
            uploadBytes(fileRef, file).then((snapshot) => {
                console.log("Uploaded a file!");
            });
        }
        if (fileName) {
            addDoc(collection(db, `users/${uid}/cards`), {
                author: author,
                quote: quote,
                file: fileName
            }
            ).then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            });
        } else {
            addDoc(collection(db, `users/${uid}/cards`), {
                author: author,
                quote: quote
            }
            ).then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            });
        }
    }
        // users/currentUserUID/randomlyGeneratedCardID/object
    //     set(newCardRef, {
    //         author: author,
    //         quote: quote,
    //         file: fileName
    //     });
    // }
    
    function readCards() {
        const q = query(collection(db, `users/${uid}/cards`));
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                cardList.push( { ...doc.data() } );
                cardList.sort(() => Math.random() - 0.5);
                cardList = cardList;
            });  
        });
    }

    // let cardList = []; 
    // function readCards() {
    //     const db = getDatabase(); 
    //     const userRef = refData(db, `users/${auth.currentUser.uid}/`);
    //     const ref = ref(db, cardRef), {
    //     for(let i = )
    // }

    // let card = 0; 
    // function downOne()
    // {
    //     if(card - 1 < 0)
    //         card = cardList.length-1; 
    //     else 
    //         card--;    
    // }

    // let testCard = [{
    //     author: "John Green",
    //     quote: "Only when it is dark enough can you see the stars.",
    //     file: "images/76773b73-d6c5-4c3a-ac3e-558d133901ebmagnoliaflower.png"
    // }]
</script>

<!-- firebase signout -->
<button on:click="{signoutUser}">Sign Out</button>

<div id="form-container">
    <form on:submit|preventDefault={uploadCard}>
        <h1>Add a card</h1>
        <!-- Name input -->
        <div class="form-outline mb-4" required>
          <input type="text" id="author" class="form-control" style="border: 1px gray dotted"/>
          <label class="form-label" for="author">Author</label>
        </div>
        
        <!-- Message input -->
        <div class="form-outline mb-4">
          <textarea class="form-control" id="quote" rows="4" required style="border: 1px gray dotted"></textarea>
          <label class="form-label" for="quote">Quote</label>
        </div>
        
        <label class="form-label" for="cardFile">Card Image</label>
        <input type="file" class="form-control" id="cardFile" style="border: 1px gray dotted" />
      
      
        <!-- Submit button -->
        <button type="submit" class="btn btn-primary btn-block mb-4 mt-3">Add</button>
    </form>
</div>

<!-- 
<div class = "cardDeck"> 
    <div id = "arrows">
        <button> x </button>
    </div>
    <div id = "card"> 
        <h1> Quote </h1>
        <p> Name </p>
    </div> 
    <div id = "arrows">
        <button> -> </button>
    </div>
</div> -->

<section style="background-color: {curColor}">
    <div id="swiper">
        <Swiper
        slidesPerView={1}
        pagination={{
            dynamicBullets: true,
          }}
        modules={[Pagination]}
        class="mySwiper"
        on:slideChange={() => randomColor()}
        on:swiper={(e) => console.log()}
        >

        <!-- {#each cardList as {author, quote, file} }
        <SwiperSlide><Card author={author} quote={quote} image={file} /></SwiperSlide>
        {/each} -->

        {#each cardList as {author, quote, file} }
        <SwiperSlide><Card author={author} quote={quote} image={file} /></SwiperSlide>
        {/each}

            <!-- <SwiperSlide><Card card={testCard} /></SwiperSlide>
            <SwiperSlide><Card card={testCard} /></SwiperSlide> -->
            <!-- <SwiperSlide><Card /></SwiperSlide>
            <SwiperSlide><Card /></SwiperSlide>
            <SwiperSlide><Card /></SwiperSlide> -->
        </Swiper>
        <!-- {#each cardList as card, index}
            <Card card={card} style="--i:{index}" />
        {/each} -->
        <!-- <Card card={testCard} style="--i:0" /> -->
        <!-- <div class="card" style="--i:0">
            <img src="https://th.bing.com/th/id/OIP.6QBcgwNCqDm24lm-SwwC7QHaEo?pid=ImgDet&rs=1">
        </div>
        <div class="card" style="--i:1">
            <img src="https://th.bing.com/th/id/R.9ff9fa618285f75981b1bf2cd2cead7c?rik=u5TiX4rh23IMcA&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f06%2fHD-solid-color-wallpaper.jpg&ehk=rGMuvcGj4Icv2ddWyPj1sQ8kUGWtXz%2f52EWYhXdqLOI%3d&risl=&pid=ImgRaw&r=0">
        </div>
        <div class="card" style="--i:2">
            <img src="https://images.freecreatives.com/wp-content/uploads/2016/04/Solid-Color-Purple-Background-.jpg">
        </div> -->
    </div>
</section>

<!-- {#each cardList as {author, quote, file} }
    <Card author={author} quote={quote} image={file}/>
{/each} -->


<style>
    @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@300&display=swap');

    :global(body) {
        /* background-color: #f5f5f5; */
        background: url("https://wallpapercave.com/wp/wp2483329.jpg") no-repeat center center fixed; 
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
    }

    #form-container {
        font-family: "Dosis", bold;
        font-weight: bolder;
        margin: 0 auto;
        padding: 5px; 
        padding-left: 10px;
        padding-right: 10px; 
        margin-bottom: 5%; 
        border-radius: 5px; 
        width: 50%;
        background-color: rgb(247, 100, 100);
    }

   #author
   {
       background-color: lightblue; 
   }

   #quote
   {
       background-color: lightblue;
   }

   #cardFile
   {
       background-color: lightblue;
   }

    .cardDeck{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly; 
        flex-grow: 1; 
        margin: 5% auto;
    }

    #arrows{
        width: 20%; 
    }

    #card {
        background-image: url("https://wallpapercave.com/wp/wp2483329.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%; 
        width: 20%; 
        height: 300px;
        word-wrap: break-word;  
    }


    #swiper {
        height: 100%;
        /* height: 70vh;
        aspect-ratio: 2/3;
        perspective: 1000px;
        perspective-origin: center 50%;
        transform-style: preserve-3d;
        position: relative; */
    }

    section {
        width: 100%;
        height: 80vh;
        transition: 0.5s ease-in-out;
        /* display: flex;
        justify-content: space-evenly;
        align-items: center; */
    }
</style>