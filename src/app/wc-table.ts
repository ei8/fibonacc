import { LitElement, html, property  } from 'lit-element'
import './wc-table.scss'

class WCTableElement extends LitElement {

  @property() columns = []
  @property() rows = []

  render() {
    return html `
      <table>
        <tr class="table-header">
          ${this.columns.map(column => {
              return html `<th>${column.header}</th>`
            })
          }
        </tr>
        ${this.rows.map(row => {
            return html `
              <tr>
                ${ this.columns.map(column => {
                      return html `<td>${row[column.field]}</td>`
                   }) 
                }
              </tr>
            `
          })
        }
      </table>
    `
  }

} 

customElements.define('wc-table', WCTableElement)