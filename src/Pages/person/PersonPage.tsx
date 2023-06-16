import { IPerson } from '../../Model/IPerson';
import React from 'react'
import { Table,Space, Modal,Form, Input, Radio, InputNumber, Row, Col, Spin  } from 'antd';
import { EditFilled,DeleteFilled ,UserAddOutlined} from '@ant-design/icons';
import Button from 'antd/es/button';
import { ColumnsType } from 'antd/es/table';
//import { render } from '@testing-library/react';
import { DatePicker } from 'antd';
import {Typography} from 'antd';



type Props = {}

const PersonPage = (props: Props) => {
 
  const [frm]= Form.useForm<IPerson>()
  const [isloading , setIsLoading] =  React.useState(false)
  const [modalOpen , setModalOpen]= React.useState(false)
  const [persons , setPersons ]=React.useState<IPerson[]>([
    {
    id:1,
    name:"محمدرضا",
    family:"پیرزاده",
    age:25,
    gender:'آقا'
  },
  {
    id:2,
    name:"علی",
    family:"سعیدی",
    age:29,
    gender:'آقا'
},
{
  id:3,
  name:"صدیقه",
  family:"سعیدی",
  age:26,
  gender:'خانم'
},
{
    id:4,
    name:"رضا",
    family:"پیری",
    age:24,
    gender:'آقا'

}
])

const columns:ColumnsType<IPerson> =

  [ 
  {
    title: 'شناسه',
    dataIndex: 'id',
    key:'frstid',
    width:'4%'
   
  },
  {
    title: 'نام',
    dataIndex: 'name',
    width:'20%',
  },
  {
    title: 'نام خانوادگی',
    dataIndex: 'family',
    width:'20%',
  },
  {
    title: 'سن',
    dataIndex: 'age',
    width:'15%',
   
  },
  {
    title: 'جنسیت',
    dataIndex: 'gender',
    width:'10%',
  },
  
  {
    title: 'تغییرات',
    dataIndex: 'id',
    width:'5%',
    key:'id1',
    render:(id:number) =>
      <Space>

        <Button id='deleteicon' icon={<DeleteFilled  />} onClick={() => onDelete(id) }/>
        <Button id='edit' icon={<EditFilled/>} onClick={ () => onEdit(id) } />
      
      </Space>
  },

];

const onDelete = (id : number) =>{
  setPersons(persons.filter(persons => persons.id !== id))
}


const onEdit = (id:number) => {

const prsn = persons.find(p => p.id === id)
if(prsn){
  frm.setFieldsValue(prsn)
  setModalOpen(true)
 }
}


const onSave = () => {
  setIsLoading(true)
  frm.submit()
  frm.validateFields()
  .then(onsavevalidate)
  .catch()
  .finally(() =>setIsLoading(false))

}
  

const onsavevalidate = (prsn:IPerson) => {
  if(prsn.id){
    const tmpper1 = persons.filter(p=> p.id! < prsn.id!)
    const tmpper2 = persons.filter(p=> p.id! > prsn.id!)
    setPersons([...tmpper1 , prsn, ...tmpper2])
    
  }
  else{
    prsn.id = Math.max(...persons.map(p=>p.id!)) +1
    setPersons([...persons , prsn])
  }
  setModalOpen(false)
}


const newUser = () => {
  frm.resetFields()
  setModalOpen(true)

  
}
    return (
      <>
      
          <DatePicker />
          
          <h1 className='mnutit'   >منوی ثبت نام </h1>
          
      <div>

      <Spin spinning={isloading}>

      <Row >
          <Col >
          <Button className='plusicon'  icon={<UserAddOutlined />} onClick={()=>newUser()} />
          </Col>
        </Row>

        <Table dataSource={persons} columns={columns} className='tbl' />
       
        
      <Modal title='ویرایش اطلاعات کاربر' open={modalOpen} onCancel={() => setModalOpen(false)} onOk={()=> onSave()} >
        <Form className='frm1' form={frm} >
              <Form.Item name="id" label="ID"  hidden>
            </Form.Item>
            <Form.Item name="name" label="نام" rules={[{ required: true },{type:'string',min:2 , max:100}]} labelCol={{span:5}} wrapperCol={{span:19}}>
                <Input className='frmname' placeholder='لطفاً نام خود را وارد فرمایید :'/>
            </Form.Item>
            <Form.Item name="family" label="نام خانوادگی" rules={[{ required: true },{type:'string',min:2 , max:100}]}labelCol={{span:5}} wrapperCol={{span:19}}>
                <Input className='frmname'  placeholder='لطفاً نام خانوادگی خود را وارد فرمایید :'/>
            </Form.Item>

        <Row>
          <Col span={12}>
            <Form.Item  name="age" label="سن" rules={[{ required: true },{type:'number',min:10 , max:75}]} labelCol={{span:10}} wrapperCol={{span:14}}>
                <InputNumber className='frmname'  placeholder='مثال : 24 :'/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="gender" label="جنسیت" rules={[{ required: true }]}labelCol={{span:11}} wrapperCol={{span:13}}>
                <Radio.Group >
                <Radio value={ 'آقا'}>آقا</Radio>
                <Radio value={'خانم'}>خانم</Radio>
                </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
                
        </Form>

      </Modal>
        
      </Spin>

      </div>

      </>
        
    )
}

export default PersonPage