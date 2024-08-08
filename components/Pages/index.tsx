import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import { url } from 'inspector';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  global.lang = { ff: "vr", ffb: "vb" }

  let name = "سرویس قیمت لحظه ای تتر"
  let img_address = "utether\\public\\6256878.jpg"
  
  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />
      <Window title={name}  style={{ minHeight: 500, margin: 10, width: "calc(100% - 20px)", backgroundColor:"midnightblue"}}>
        <br></br>
        <br></br>
        <div className='bg'>
          <br></br>
          <br></br>
          <div className='second-image-div'>
            <img src="/test2.png" alt="hi" />
          </div>
          <div className='image-div'>
            <img src="https://seeklogo.com/images/T/tether-usdt-logo-FA55C7F397-seeklogo.com.png" alt="hi" />
          </div>

          <div style={{
            width: "70%", height: 300,
            borderRadius: 20, backgroundColor: "rgba(25,25,112,0.95)",
            marginRight: 20, color: "white", 
          }}>
            <ul style={{ margin: 10, paddingTop: 30}}>
              <li className='list-item time'>امروز: <span className='time'>{props.api_time.time24.hour.fa}:{props.api_time.time24.minute.fa}:{props.api_time.time24.second.fa} | {props.api_time.date.day.number.fa} {props.api_time.date.month.name} {props.api_time.date.year.number.fa}</span></li>
              <li className="list-item price">قیمت: <span className="price">{(props.price.price as number).toLocaleString("fa-IR")}</span></li>
              <li className="list-item changes">تغییرات در ۲۴ ساعت گذشته: <span>{(parseFloat(props.price.diff24d)).toLocaleString("fa-IR")}٪</span></li>
              <li className="list-item changes">تغییرات در ۷ روز گذشته: <span>{(parseFloat(props.price.diff7d)).toLocaleString("fa-IR")}٪</span></li>
              <li className="list-item changes">تغییرات در ۳۰ روز گذشته: <span>{(parseFloat(props.price.diff30d)).toLocaleString("fa-IR")}٪</span></li>

            </ul>
          </div>

        </div>

      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {
  
  
  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;
    
    let response = await (await fetch("https://api.tetherland.com/currencies"))
    let time_response = await (await fetch("https://api.keybit.ir/time/"))
    let data = await response.json()
    let price = data.data.currencies.USDT
    let api_time = await time_response.json()

    
    return {
      props: {
        data: global.QSON.stringify({
          price:price,
          session,
          api_time:api_time,
          // nlangs,
        })
      },
    }
  }