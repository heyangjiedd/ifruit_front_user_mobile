import React from 'react';
import {Carousel, } from "antd-mobile";
import  styles  from './index.module.less'
import a from '../../assets/images/a.jpg'
import b from '../../assets/images/b.jpg'
import c from '../../assets/images/c.jpg'
class Index extends React.Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 176,
    }
    componentWillMount() {

    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: [a, b, c],
            });
        }, 100);
    }

    render() {
        return (
            <Carousel className={styles.space}
                      autoplay={false}
                      infinite
            >
                {this.state.data.map((val,index) => (
                    <a
                        key={index}
                        href="http://www.alipay.com"
                        style={{ display: 'inline-block', width: '100%'}}
                    >
                        <img
                            src={val}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top', height:'150px'}}
                            onLoad={() => {
                                window.dispatchEvent(new Event('resize'));
                                this.setState({ imgHeight: 'auto' });
                            }}
                        />
                    </a>
                ))}
            </Carousel>
        )
    }

    componentWillReceiveProps() {

    }

    shouldComponentUpdate() {
        return true
    }

    componentWillUpdate() {

    }

    componentDidUpdate() {

    }

    componentWillUnmount() {

    }
}
export default Index;