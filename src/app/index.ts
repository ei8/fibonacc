import { LitElement, html, property, css } from 'lit-element'
import './wc-table'

class AppElement extends LitElement {

  @property() columns
  @property() rows

  firstUpdated() {
    fetch('/api/fibonacci')
      .then(res => res.json())
      .then(data => {
        this.columns = data.columns
        this.rows = data.rows
      });
  }

  render() {
    return html `
      <style>
        .container {
          display: grid;
          grid-template-columns: 10% 80% 10%;
          margin-top: 50px;
        }
      </style>
      <div class="container">
        <div></div>
        <wc-table .columns=${this.columns} .rows=${this.rows}></wc-table>
        <div></div>
      </div>
    `
  }

}

customElements.define('wc-app', AppElement)