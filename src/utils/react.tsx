import React from "react";
import ReactDOM from "react-dom";

// const SCWrapper = <T extends object>(): React.FC<T> => {
//   return (props: T & { className?: string; children?: React.ReactNode }) => (
//     <div className={props.className}>{props.children}</div>
//   );
// };
// SCWrapper.displayName = "SCWrapper";
type PortalProps = {
  root: HTMLElement;
  el: HTMLElement;
  name: string;
  children: React.ReactNode;
};
export class Portal extends React.Component<PortalProps> {
  private root: HTMLElement;
  private el: HTMLElement;
  constructor(props: PortalProps) {
    super(props);
    this.el = document.createElement("div");
    this.root = this.props?.root || document.body;
  }
  componentDidMount(): void {
    this.el.className = `portal__container_${this.props?.name}`;
    this.root.appendChild(this.el);
  }

  componentWillUnmount(): void {
    this.root.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
