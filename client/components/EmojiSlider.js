import { Slider, Icon } from 'antd';

class EmojiSlider extends React.Component {
  state = {
    value: 0,
  }
  handleChange = (value) => {
    this.setState({ value });
  }
  render() {
    const { max, min } = this.props;
    const { value } = this.state;
    return (
        <Slider {...this.props} onChange={this.handleChange} value={value} />
    );
  }
}
