import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'my-button',
  styleUrl: 'my-button.css',
  shadow: true,
})
export class MyButton {
  @Prop() btnText: string;
  @Prop() btnColor: string;
  @Prop() btnBgColor: string;
  @Event({ eventName: 'checkEvent' }) public checked: EventEmitter<any>;

  public selectedChecked(event: any): any {
    this.checked.emit(event);
  }

  public componentDidLoad() {
    console.log('component is loaded!');
  }

  render() {
    const styles: { [s: string]: string } = {
      'color': this.btnColor,
      'background-color': this.btnBgColor,
    };
    return (
      <div>
        <button type="button" style={styles} class="btn" onClick={(event: UIEvent) => this.selectedChecked(event)}>
          {this.btnText}
        </button>
      </div>
    );
  }
}
