import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {createForm} from 'rc-form';
import {NavBar, Icon, List, InputItem, Flex, WhiteSpace,TextareaItem, Toast, Button,Picker,} from 'antd-mobile';
import {queryNoPage as getArea} from '@/api/area'
import {queryNoPage as getFarmer} from '@/api/farmer'
import {add} from '@/api/farmer'
import {listToTreeData,getDeep} from '@/utils'

@createForm()
@injectIntl
class Index extends React.Component {
    state = {
        areaTree:[],
        productTagTree:[],
        farmer:[],
    }
    componentDidMount(){
        getArea().then(res=>{
            this.setState({
                areaTree:listToTreeData(res.data, ['id', 'value', 'name', 'label']),
            })
        })
        this.fetchFarmer();
    }
    fetchFarmer(){
        getFarmer().then(res=>{
            this.setState({
                farmer:res.data.map(item=>({
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
                >录入农户信息</NavBar>
                    <List className="picker-list">
                        <InputItem className={'required'} {...getFieldProps('name', {
                            rules: [{ required: true, message: '请输入姓名！' }],
                        })} clear placeholder="请输入姓名">姓名</InputItem>
                        <InputItem{...getFieldProps('phone', {
                            rules: [{ required: true, message: '请输入联系电话！' }],
                        })} clear type="phone" placeholder="请输入联系电话">电话</InputItem>
                        <Picker
                            title="选择地区"
                            extra="请选择地区"
                            {...getFieldProps('areas', {
                                initialValue: [],
                                rules: [{ required: true, message: '请选择地区！' }],
                            })}
                            data={this.state.areaTree}
                            value={this.state.pickerValue}
                            onChange={v => this.setState({ pickerValue: v })}
                            onOk={v => this.setState({ pickerValue: v })}
                        >
                            <List.Item arrow="horizontal">区域</List.Item>
                        </Picker>
                        <InputItem{...getFieldProps('adress')} clear placeholder="请输入地址">地址</InputItem>
                        <Picker data={this.state.farmer} cols={1} {...getFieldProps('pid')} >
                            <List.Item arrow="horizontal">户主</List.Item>
                        </Picker>
                        <TextareaItem
                            {...getFieldProps('description')}
                            title="备注" rows={3}
                            placeholder="请输入备注"
                        />
                    </List>
                <Button style={{width: '100%',bottom:0,position:'absolute'}} type="primary" onClick={this.handleClick}>确定</Button>
            </div>
        );
    }
}

export default Index;
