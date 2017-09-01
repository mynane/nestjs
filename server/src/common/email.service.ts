/**
 * @file email.service.ts
 * @author shijh
 *
 * 邮件发送服务
 */

import * as email from 'emailjs';
import { Component } from "@nestjs/common";

import * as config from '../config/environment';

const smtpServer = email.server.connect({
    user: config.emailAddress,
    password: config.emailPassword,
    host: config.emailHost,
    ssl: true
})

/**
 * send 参数
 *
 *	text		// 电子邮件的文本
 *	from		// 发件人 格式 (地址 or 姓名 <地址> or "姓名" <地址>)
 *	to			// 收件人 （和发件人格式相同），多个发件人用逗号隔开
 *	cc			// 抄送人 （和发件人格式相同），多个抄送人用逗号隔开
 *	bcc		    // 盲抄送 （和发件人格式相同），多个抄送人用逗号隔开（相互之间不知道抄送人）
 *	subject	    // 电子邮件主题
 *  attachment  // 一个附件或附件数组
 */
/**
 * attachment 参数
 * 
 * path      // string to where the file is located
 * data      // string of the data you want to attach
 * stream    // binary stream that will provide attachment data (make sure it is in the paused state)
 *           // better performance for binary streams is achieved if buffer.length % (76*6) == 0
 *           // current max size of buffer must be no larger than Message.BUFFERSIZE
 *
 *             // optionally these fields are also accepted
 * type	       // string of the file mime type
 * name        // name to give the file as perceived by the recipient
 * charset     // charset to encode attatchment in
 * method      // method to send attachment as (used by calendar invites)
 * alternative // if true, will be attached inline as an alternative (also defaults type='text/html')
 * inline      // if true, will be attached inline
 * encoded     // set this to true if the data is already base64 encoded, (avoid this if possible)
 * headers     // object containing header=>value pairs for inclusion in this attachment's header
 * related     // an array of attachments that you want to be related to the parent attachment
 */

export default class EmailService {
    static sendText(message, callBack) {
        return smtpServer.send(message, (err) => {
            if (err) {
                return false;
            }
            callBack && callBack();
            return true;
        })
    }
}
