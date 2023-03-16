class HintWidget extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
        <section class="container">
                <p><strong>Компания или ИП</strong></p>
                <input list="company-list" id="party" name="party" type="text" placeholder="Введите название, ИНН, ОГРН или адрес организации" />
                <ul class="suggestions"></ul>
                </div>  
            </section>

            <section class="result">
                <p id="type"></p>
                <div class="row">
                    <label>Краткое наименование</label>
                    <input id="name_short">
                </div>
                <div class="row">
                    <label>Полное наименование</label>
                    <input id="name_full">
                </div>
                <div class="row">
                    <label>ИНН / КПП</label>
                    <input id="inn_kpp">
                </div>
                <div class="row">
                    <label>Адрес</label>
                    <input id="address">
                </div>
            </section>
        `;

        let queryValue = document.getElementById("party");
        let shortValue = document.getElementById("name_short");
        let fullValue = document.getElementById("name_full");
        let innValue = document.getElementById("inn_kpp");
        let addressValue = document.getElementById("address");
        let suggestions = document.querySelector(".suggestions");

        suggestions.style = "display: none";

        let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
        const apiKey = 'a539e4b9c0a97368ba7b2af7b371fc38d6d2b05f';
        
        let options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + apiKey
            }
        };

        function setData(el) {
            suggestions.style = "display:none";
            queryValue.value = el.value;
            shortValue.value = el.data.name.short_with_opf;
            fullValue.value = el.data.name.full_with_opf;
            innValue.value = `${el.data.inn}/${el.data.kpp}`;
            addressValue.value = el.data.address.value;
        }

        function fetchQuery(val) {
            if(val != "") {
                fetch(url, {
                    ...options,
                    body: JSON.stringify({query: val})
                })
                    .then((res) => res.json())
                    .then((res) => {
                        const arrData = res.suggestions;

                        suggestions.style = "display: block"

                        arrData.forEach((el) => {
                            let li = document.createElement("li");
                            li.classList.add("suggestions-item");
                            li.innerText = el.value;
                            suggestions.appendChild(li);
                            li.addEventListener("click", () => setData(el));
                        })
                    })  
                    .catch(error => console.log("error", error));
                }

                suggestions.style = "display: none"
        }

        queryValue.addEventListener("input", (evt) => fetchQuery(evt.target.value));
    }    
}
  
customElements.define("hint-widget", HintWidget);