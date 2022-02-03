import { cdnUrl, projectID } from "./env.js";
//const projectID = "yv9fyu8k";
import { handleImage, handleParagraphs } from "./utils.js";

function init() {
  const urlString = window.location.search;
  const paramsUrl = new URLSearchParams(urlString);
  const pageValue = paramsUrl.get("page");

  console.log(pageValue);

  if (pageValue === null) {
    console.log("reload");
    getPosts();
  } else {
    getPost(pageValue);
  }
}

init();

function getPost(pageValue) {
  return pageValue;
}

async function getPosts() {
  /* her lager vi en variabel hvor vi lagre inn data som kommer fra sanity.io
  fetch er javascript funksjon som venter på url argument 
  i vår tilfeldig url er sanity endpoint med query for filtrere bare post (prosjekter) 
  siden fetch er en "Promise" må vi bruke await [_type == "post"] filtrerer bare content type "post"*/
  // NB. = projectID variable kommer fra env.js fil
  const posts =
    await fetch(`https://${projectID}.api.sanity.io/v1/data/query/production?query=*
  [_type == "post"]
  `);
  /* etter fetch har ferdig returnere en http response objekt og vi henter ut av det
  result underobjekt ved hjelp av en til funksjon av javascript json()*/
  const { result } = await posts.json();
  /* result er nå en array av objekter med data vi skriver i vår sanity.studio */

  // her definerer vi inn i en variabel hvor vi kommer til å bygge de blokkene med prosjekter
  const worksList = document.querySelector(".menu-projects");

  // nå trenger vi å loop inn i resultat fra sanity med en forEach
  // forEach går gjennom hele array av objekter og sender til en funksjon en objekt etter hverandre
  // jeg kalte "post" hver objekt som er sent in in forEach
  // så "post" innholder verdi av hver eneste prosjekt
  result.forEach((post) => {
    // vi begynne å bygge block med createElement og blokken er en <a href="">
    const workBlock = document.createElement("a"); // vi bygget her <a></a>
    workBlock.classList.add("projects"); // vi legger til en class til <a class="work"></a>
    workBlock.classList.add("project1");
    workBlock.setAttribute("href", `./work.html?page=${post.slug.current}`); // her legge vi til attribute href med slug verdi inn <a class="work" href="./work.html/tittel-2"

    // vi trenger en h2 element inn i hoved block
    const workTitle = document.createElement("h2"); // vi lagd <h2></h2> her
    workTitle.classList.add("work-title"); // <h2 class="work-title"></h2>
    workTitle.innerText = post.title; // inn i tag skriver vi verdi fra post.title
    workBlock.append(workTitle); // vi legger til h2 element inn i <a> block

    // i alternativt til de fem linjer over kan vi benytte av en stætte funksjon som gjøre jobben en gang for alle
    // ved å bruke dette løsning kan vi slette alt fra 79 til 92 og beholde bare dette som kommer
    workBlock.append(handleImage(post.mainImage.asset._ref, "work-cover"));
    // slut av bildet håndtering

    worksList.append(workBlock); // til slutt legge vi inn hele <a> block inn i worklist section
  });

  var lastScrollTop;

  //navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      navbar.style.top = "-80px";
    } else {
      navbar.style.top = "0";
    }

    lastScrollTop = scrollTop;
  });
}
