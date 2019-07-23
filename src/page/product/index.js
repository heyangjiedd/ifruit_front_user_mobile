import React from 'react';
import ReactDOM from 'react-dom';
import {Badge, ListView, PullToRefresh, NavBar, Icon, Flex} from 'antd-mobile';
import one from "../../assets/images/one.png";
import two from "../../assets/images/two.png";
import three from "../../assets/images/three.jpg";

const data = [
    {
        img: one,
        title: '枇杷',
        des: '攀枝花特产，买到就是赚到，千万不要错过',
    },
    {
        img: two,
        title: '芒果',
        des: '攀枝花特产，买到就是赚到，千万不要错过',
    },
    {
        img: three,
        title: '石榴',
        des: '攀枝花特产，买到就是赚到，千万不要错过',
    },
];
const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
    const dataArr = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
    }
    return dataArr;
}

class Index extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
        };
    }
    componentDidUpdate() {
        if (this.state.useBodyScroll) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

        setTimeout(() => {
            this.rData = genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(genData()),
                height: hei,
                refreshing: false,
                isLoading: false,
            });
        }, 1500);
    }

    onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true });
        // simulate initial Ajax
        setTimeout(() => {
            this.rData = genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                refreshing: false,
                isLoading: false,
            });
        }, 600);
    };

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.rData = [...this.rData, ...genData(++pageIndex)];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    };

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (
                <div key={rowID}
                     style={{
                         padding: '0 15px',
                         backgroundColor: 'white',
                     }}
                >
                    <div style={{ height: '50px', lineHeight: '50px', color: '#888', fontSize: '16px', borderBottom: '1px solid #ddd' }}>
                        {obj.title}
                    </div>

                    <div style={{display: 'flex',padding: '10px 0',}}>
                        <img style={{ height: '63px', width: '63px', marginRight: '15px' }} src={obj.img} alt="" />
                        <div style={{ display: 'inline-block' }}>
                            <div style={{ marginBottom: '8px', color: '#000', fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>{obj.des}-{rowData}</div>
                            <div style={{marginTop: '5px',}}><span style={{ fontSize: '12px' }}>月销量</span>
                                <span style={{  marginLeft: '5px', fontSize: '16px',color: '#FF6E27' }}>{rowID}</span>
                            </div>
                            <Flex justify="between" align='end'>
                                <div>
                                    <Badge text="有机"
                                           style={{
                                               backgroundColor: '#fff',
                                               borderRadius: 2,
                                               color: '#f19736',
                                               border: '1px solid #f19736',
                                           }}
                                    />
                                    <Badge text="绿色"
                                           style={{
                                               marginLeft: 12,
                                               backgroundColor: '#fff',
                                               borderRadius: 2,
                                               color: '#4cf13f',
                                               border: '1px solid #4cf13f',
                                           }}
                                    />
                                </div>
                                <div >
                                    <span style={{ fontSize: '24px', color: '#FF6E27' }}>{rowID}</span> <span>元/斤</span>
                                </div>
                            </Flex>

                        </div>
                    </div>
                </div>
            );
        };
        return (<div>
            <NavBar
                mode="light"
                icon={<Icon type="left"/>}
                onLeftClick={() => this.props.history.goBack(-1)}
            > 产品列表</NavBar>
            <ListView
                key={this.state.useBodyScroll ? '0' : '1'}
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderRow={row}
                renderSeparator={separator}
                useBodyScroll={this.state.useBodyScroll}
                style={this.state.useBodyScroll ? {} : {
                    height: this.state.height,
                    border: '1px solid #ddd',
                    margin: '5px 0',
                }}
                pullToRefresh={<PullToRefresh
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />}
                onEndReached={this.onEndReached}
                pageSize={5}
            />
        </div>);
    }
}

export default Index;
