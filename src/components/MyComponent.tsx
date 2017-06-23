import * as React from 'react';

import sizeMe from 'react-sizeme';

interface Props {
    size: any;
}

class MyComponent extends React.Component<Props, null> {
  render() {
    const { width, height } = this.props.size;

    return (
        <div>
            My size is {width}px x {height}px
            {width < 250 ? "poeti" : "grand"}
        </div>
    );
  }
}

export default sizeMe({ monitorHeight: true })(MyComponent);