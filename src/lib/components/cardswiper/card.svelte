<script>
    import { getDownloadURL, getStorage, ref } from "firebase/storage";

    export let quote, author, image;

    let backgroundStyle;
    let textbgcolor;
    let imageUrl;
    const effects = [
        {
            link: "https://media.discordapp.net/attachments/839663854936915978/1020953051919556628/comics-speech-balloon-comic-book-cartoon-explosion-cloud-vector-elements-dialog-c96e19165073bac473de2fbe3bcb38f4.png?width=828&height=481",
            width: 300,
            height: 200,
        },
        {
            link: "https://media.discordapp.net/attachments/839663854936915978/1020953393717584023/pngwing.com_1.png?width=828&height=452",
            width: 250,
            height: 200,
        },
        {
            link: "https://media.discordapp.net/attachments/839663854936915978/1020953538697908304/pngwing.com_2.png?width=574&height=534",
            width: 200,
            height: 200,
        },
        {
            link: "https://media.discordapp.net/attachments/839663854936915978/1020954729813131264/pngegg.png?width=534&height=534",
            width: 250,
            height: 250,
        },
        {
            link: "https://media.discordapp.net/attachments/839663854936915978/1021031033531027526/unknown.png?width=705&height=465",
            width: 250,
            height: 200
        },
        {
            link: "https://media.discordapp.net/attachments/839663854936915978/1021031448431566929/unknown.png",
            width: 200,
            height: 200
        },
        {
            link: "https://media.discordapp.net/attachments/839663854936915978/1021032233357807676/unknown.png",
            width: 200,
            height: 200
        },
        {
            link: "https://media.discordapp.net/attachments/839663854936915978/1021033035082256394/unknown.png",
            width: 200,
            height: 200
        }
    ];
    const topAndLeft = [
        {
            top: 30,
            left: 500,
        },
        // {
        //     top: 0,
        //     left: 0
        // },
        // {
        //     top: 0,
        //     left: 0
        // },
        // {
        //     top: 0,
        //     left: 0
        // }
    ];

    if (image) {
        textbgcolor = "rgba(80,80,80,0.5)";
        const storage = getStorage();
        const pathReference = ref(storage, image);
        getDownloadURL(pathReference)
            .then((url) => {
                imageUrl = url;
                if (imageUrl) {
                    backgroundStyle = `background-image: url(${imageUrl});`;
                }
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        textbgcolor = "rgba(0,0,0,0)";
        backgroundStyle = `background-color: #808080;`;
    }

    let imageEffect = "";
    let tlValue;
    imageEffect = setEffect();
    // Sets imageEffect to a random effect from the effects array, 50% chance of an effect being chosen
    function setEffect() {
        // Choose random top and left from topAndLeft array
        tlValue = {
            // top value between 0 and 550
            top: Math.floor(Math.random() * 550),
            // left value between 0 and 1650 excluding 500 to 1100
            left: Math.random()<0.5 ? Math.floor(Math.random() * 500) : Math.floor(Math.random() * 600) + 1100,
        }
        if (Math.random() < 0.5) {
            return effects[Math.floor(Math.random() * effects.length)];
        } else {
            return {
                link: null,
            };
        }
    }

    // let startPointX, startPointY, offsetX, offsetY;
    // let clientX, clientY;

    // const mouseDown = (e) => {
    //     startPointX = e.x;
    //     startPointY = e.y;
    // };

    // const mouseMove = (e) => {
    //     if (!startPointX) return;
    //     // const { clientX, clientY } = e;
    //     offsetX = e.x - startPointX;
    //     offsetY = e.y - startPointY;
    // };

    // const mouseUp = (e) => {
    //     startPointX = null;
    //     offsetX = 0;
    //     offsetY = 0;
    // }

    // const dragStart = (e) => {
    //     e.preventDefault();
    // }
</script>

<!-- <div
    class="card"
    on:mousedown={mouseDown}
    on:mouseup="{mouseUp}"
    on:mousemove="{mouseMove}"
    on:dragstart="{dragStart}"
    style="transform: translate({offsetX}px, {offsetY}px);
    transition: transform 0.5s ease-in-out;"
>
    <img src={card.imageUrl} alt="..." />
</div> -->

<div class="cardholder">
    <div class="card" style={backgroundStyle}>
        <p id="cardquote" style="background-color: {textbgcolor}">{quote}</p>
        <p id="cardauthor" style="background-color: {textbgcolor}">- {author}</p>
    </div>
    <img
        id="effect"
        src={imageEffect.link}
        style="width:{imageEffect.width}px; height:{imageEffect.height}px; top: {tlValue.top}px; left: {tlValue.left}px"
    />
</div>

<style>
    /* .card {
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: 20px;
        overflow: hidden;
        transform: translateZ(calc(-30px * var(--i)))
        translateY(calc(-20px * var(--i))) rotate(calc(-4deg * var(--i)));
        filter: drop-shadow(2px 2px 20px rgba(0,0,0,0.5));
        cursor: pointer;
        user-select: none;
    }

    .card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 50% 50%;
    } */

    .cardholder {
        height: 80vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card {
        height: 70%;
        padding: 15px;
        /* width: 45%; */
        aspect-ratio: 2/3;
        background-color: purple;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
    }

    p {
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
            "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    }

    #cardquote {
        font-size: 1.5rem;
        font-weight: 600;
        color: white;
    }

    #cardauthor {
        font-size: 1.1rem;
        font-weight: 400;
        color: white;
    }

    #effect {
        position: absolute;
        display: block;
        z-index: 1;
    }
</style>
