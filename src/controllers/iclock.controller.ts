import { Request, Response } from 'express'
import { Cmd } from '../models/cmd.model'
import moment from 'moment'

export class IclockController {

    public cdataGet(req: Request, res: Response) {
        const response = `GET OPTION FROM: ${req.query.SN}
        Stamp=9999
        OpStamp=9999
        ErrorDelay=30
        Delay=10
        TransTimes=00:00;14:05
        TransInterval=2
        TransFlag=1000000000
        TimeZone=7
        Realtime=1
        Encrypt=0`

        res.status(200).header('content-type', 'text/plain').send(response)
    }

    public async cdataPost(req: Request, res: Response) {
        if (req.query.table == 'ATTLOG') {
            const cmd = await Cmd.findOne({ where: { sn: req.query.SN as string, status: 0 }, order: { inputDate: 'ASC' } })

            if (cmd) {
                if (req.bodyRaw != undefined) {
                    const rows = req.bodyRaw.split("\n")
                    let data = [];
                    rows.forEach((row: string) => {
                        let cols = row.split("\t")
                        if (cols.length < 2) return
                        data.push(cols)
                    })
                    console.log(JSON.stringify(data))
                    await Cmd.update({ id: cmd.id }, { status: 1, finishDate: new Date() })
                }

            }
        }

        res.status(200).header('content-type', 'text/plain').send('OK')
    }

    public deviceCmdPost(req: Request, res: Response) {
        res.status(200).header('content-type', 'text/plain').send('OK')
    }

    public async getRequestGet(req: Request, res: Response) {
        const cmd = await Cmd.findOne({ where: { sn: req.query.SN as string, status: 0 }, order: { inputDate: 'ASC' } })
        if (cmd) {
            res.status(200).header('content-type', 'text/plain').send(`C:121:DATA QUERY ATTLOG StartTime=${moment(cmd.startDate).format('YYYY-MM-DD HH:mm:ss')}\tEndTime=${moment(cmd.endDate).format('YYYY-MM-DD HH:mm:ss')}\n`)
            return
        }
        res.status(200).header('content-type', 'text/plain').send('OK')
    }
}