const apiKey = 'a539e4b9c0a97368ba7b2af7b371fc38d6d2b05f';

class HintWidget extends HTMLElement {
    constructor() {
        super();
      }

      connectedCallback() {
        this.innerHTML = `
        <section class="container">
                <p><strong>Компания или ИП</strong></p>
                <input id="party" name="party" type="text" placeholder="Введите название, ИНН, ОГРН или адрес организации" />
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
        `
      }
}
  
customElements.define("hint-widget", HintWidget);