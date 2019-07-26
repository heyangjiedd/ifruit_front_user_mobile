import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {createForm} from 'rc-form';
import {NavBar, Icon, List, InputItem, Flex, WhiteSpace,TextareaItem, Toast, Button,Picker,} from 'antd-mobile';
import {queryNoPage as getProductTag} from '@/api/productTag'
import {queryNoPage as getFarmer} from '@/api/farmer'
import {add} from '@/api/farmer'
import {listToTreeData,getDeep} from '@/utils'

@createForm()
@injectIntl
class Index extends React.Component {
    state = {
        productTagTree:[],
        farmer:[],
    }
    componentDidMount(){
        getProductTag().then(res=>{
            this.setState({
                productTagTree:listToTreeData(res.data, ['id', 'value', 'name', 'label']),
            })
        })
        this.fetchFarmer();
    }
    fetchFarmer(){
        getFarmer({pid:'0'}).then(res=>{
            this.setState({
                farmer:res.data.filter(item=>item.pid).map(item=>({
                    value:item.id,
                    label:item.name,
                }))
            })
        })
    }
    handleClick = () => {
        const {form} = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) {
                Toast.fail(err[Object.keys(err)[0]].errors[0].message, 1, () => {
                }, true)
                return;
            }
            add({...fieldsValue}).then(()=>{
                form.resetFields();
                this.props.addUser({...fieldsValue});
                this.props.history.goBack(-1)
            })
        });
    }

    render() {
        const {getFieldProps} = this.props.form;
        const {intl} = this.props;
        return (
            <div style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack(-1)}
                >录入农产品信息</NavBar>
                <List className="picker-list">
                    <Picker
                        title="产品标签"
                        extra="请选择"
                        {...getFieldProps('tagIds', {
                            initialValue: [],
                        })}
                        data={this.state.productTagTree}
                        value={this.state.pickerValue}
                        onChange={v => this.setState({ pickerValue: v })}
                        onOk={v => this.setState({ pickerValue: v })}
                    >
                        <List.Item arrow="horizontal">产品标签</List.Item>
                    </Picker>
                    <Picker data={this.state.farmer} cols={1} {...getFieldProps('farmerId')} >
                        <List.Item arrow="horizontal">农户</List.Item>
                    </Picker>
                    <InputItem{...getFieldProps('num')} clear placeholder="请输入地址">产量(kg)</InputItem>
                    <InputItem{...getFieldProps('cover')} clear placeholder="请输入地址">面积(㎡)</InputItem>
                    <InputItem{...getFieldProps('ripeTime')} clear placeholder="请输入地址">成熟时间</InputItem>
                </List>
                <Button style={{width: '100%',bottom:0,position:'absolute'}} type="primary" onClick={this.handleClick}>确定</Button>
            </div>
        );
    }
}

export default Index;
