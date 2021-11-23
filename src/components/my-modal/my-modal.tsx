import { Component, h, getAssetPath, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'my-modal',
  styleUrl: 'my-modal.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class MyModal {
  @Prop({
    mutable: true,
    reflect: true,
  })
  @Prop()
  header: string;
  @Prop()
  closeIcon = 'x.svg';
  @Prop() isopen: boolean;
  @Prop() buttons: string;

  //State for our buttons array
  @State() _buttons: Array<any>;

  //Watch for data
  @Watch('buttons')
  objectDataWatcher(newValue) {
    if (typeof newValue === 'string') {
      this._buttons = JSON.parse(newValue);
    } else {
      this._buttons = newValue;
    }
  }

  // Before the components loaded, we then convert the buttons string to an array
  componentWillLoad() {
    this.objectDataWatcher(this.buttons);
    // console.log(this.buttons, 'Original String');
    // console.log(this._buttons, 'New Array');
  }

  // Events
  @Event() private action: EventEmitter;

  // Functions
  private handleCancel = () => {
    this.isopen = false;
  };

  private handleAction = () => {
    this.action.emit();
  };

  render() {
    return (
      <div class={this.isopen ? 'modal-wrapper isopen' : 'modal-wrapper'}>
        <div class="modal-overlay" onClick={this.handleCancel} />
        <div class="modal">
          <div class="header">
            <h6>{this.header}</h6>
            <div class="close" onClick={this.handleCancel}>
              <img src={getAssetPath(`./assets/${this.closeIcon}`)} />
            </div>
          </div>
          <div class="body">
            <slot></slot>
          </div>
          <div class="footer">
            {this._buttons.map((button, index) => (
              <my-button onClick={index === 0 ? this.handleAction : this.handleCancel} btn-text={button.text} btn-color="white" btn-bg-color={button.color}></my-button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
