
import * as fs from 'fs'
import { Request, Response } from 'express'
import { create as createPdfFile } from 'html-pdf'

import { toBoolean } from '../../helpers/convert'
import { normalizeString } from '../../helpers/normalizeString'
import * as lessonsServices from '../../services/lessons'

export async function getLessonPlanExport(req: Request, res: Response) {
    const lessonId: string = req.params.lessonId
    const forceDownload: boolean = toBoolean(req.query.forceDownload)


    const lesson = await lessonsServices.getLessonById(lessonId, req.state)


    const html = `
        <html>
            <head>
                <title>Lesson Plan</title>
                <style>
                    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');

                    html, body {
                        font-family: 'Open Sans', sans-serif;
                        font-size: 3mm;
                    }

                    .flex {
                        display: flex;
                        display: -webkit-flex;
                    }
                </style>
            </head>
            <body>
                <div class="flex" style="align-items: flex-end; align-items: -webkit-flex-end; width: 100%;">
        <div style="flex: 4; -webkit-flex: 4;">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50%"
                viewBox="0 0 640.00002 550.00003"
            >
                <path
                    d="M307.914 531.72c-1.083-2.382-10.622-22.332-21.2-44.332-10.577-22-20.117-41.95-21.2-44.333-1.08-2.383-2.165-4.135-2.406-3.893-.406.405-18.355 87.29-18.382 88.976-.01.413-4.512.75-10.012.75-5.5 0-10-.4-10-.888 0-1 28.385-139.956 30.114-147.422l1.115-4.81 26.74 57.81c14.705 31.796 27.086 57.725 27.512 57.62.426-.105 12.817-26.117 27.534-57.805l26.758-57.614 1.114 4.804C367.332 388.047 395.714 527 395.714 528c0 .49-4.5.888-10 .888s-10-.233-10-.518c0-1.308-17.174-85.27-17.894-87.482-.754-2.316-1.036-2.023-3.835 4-5.267 11.33-43.38 90.44-43.75 90.812-.194.195-1.24-1.595-2.32-3.98zM5.714 457.89v-71h19v124h55v18h-74v-71zm78.793 65.234c54.602-116.284 67.793-144.17 68.207-144.194.376-.02 67.118 144.525 68.834 149.076.183.486-4.566.884-10.554.884h-10.887l-8.85-20.014-8.848-20.014-30.485.264-30.484.264-8.99 19.75-8.988 19.75H81.8l2.707-5.766zm89.183-52.484c-.04-2.094-20.62-47.264-21.438-47.05-.588.152-22.535 46.946-22.537 48.05 0 .138 9.9.25 22 .25 16.945 0 21.994-.287 21.975-1.25zm246.024-12.75v-71l19.25.035c29.638.054 40.81 2.977 50.348 13.173 14.39 15.385 14.39 39.2 0 54.585-8.37 8.948-21.494 13.208-40.686 13.208h-9.912v61h-19v-71zm49.252-11.324c8.206-4.03 11.256-9.373 11.228-19.676-.014-5.177-.555-8.49-1.75-10.698-4.13-7.64-13.827-11.302-29.94-11.302h-9.79v45.207l12.25-.353c11.023-.316 12.827-.635 18.002-3.176zm29.748 81.445c0-1.137 68.792-147.314 69.802-148.323.547-.548 66.335 140.757 69.032 148.272.192.535-4.278.928-10.554.928h-10.887l-8.85-20.014-8.848-20.014-30.485.264-30.484.264-8.99 19.75-8.988 19.75h-10.374c-5.706 0-10.374-.396-10.374-.88zm90.09-60.372c-7.365-17.007-19.333-43.388-19.977-44.034-.43-.432-5.663 9.918-11.627 23-5.965 13.08-11.016 24.122-11.224 24.534-.21.413 9.756.75 22.144.75h22.523l-1.84-4.25zm-281.532-71.25c.927-6.4 5.17-14.616 10.242-19.838l4.7-4.838-21.1.71-21.098.71-.64-3.872c-1.19-7.21-1.726-6.746 14.088-12.188 16.693-5.744 22.66-8.108 22.038-8.73-.236-.235-10.233-.857-22.217-1.382-11.983-.526-21.904-1.094-22.047-1.263-.143-.17-.488-4.15-.768-8.844l-.508-8.536 10.126-2.614c13.64-3.52 22.327-6.843 20.524-7.85-.77-.43-8.74-1.228-17.712-1.772-8.973-.543-16.538-1.21-16.81-1.484-.274-.273-.182-4.385.204-9.138l.7-8.642 10.11.786c14.7 1.143 61.546.81 72.556-.518 5.195-.626 9.617-.967 9.826-.757.503.502 4.19 14.72 4.21 16.242.01.648-9.32 4.852-20.732 9.34-11.412 4.488-20.975 8.407-21.25 8.708-.275.3 6.954.253 16.063-.105l16.563-.652 1.816 5.765c1 3.17 2.034 6.334 2.3 7.03.516 1.347-20.936 12.068-32.516 16.252-3.45 1.247-6.015 2.525-5.7 2.84.316.316 6.402.452 13.524.3l12.95-.273v3.038c0 2.498-.49 3.148-2.75 3.658-12.568 2.83-19.98 6.385-26.122 12.526-4.194 4.194-6.96 8.68-9.758 15.838l-1.39 3.554.578-4zm6.942-117.99c-.55-.185-2.237-.608-3.75-.94-1.898-.42-2.75-1.237-2.75-2.638 0-1.117 1.787-10.923 3.972-21.79 6.602-32.847 14.93-59.036 25.396-79.88 2.548-5.07 4.632-9.343 4.632-9.492 0-.148-10.913-.295-24.25-.327-18.206-.042-26.12-.453-31.75-1.65-4.125-.877-7.644-1.457-7.82-1.29-.175.168.664 2.233 1.867 4.59 4.12 8.077 8.07 26.306 8.676 40.037.59 13.42.068 17.87-2.1 17.87-1.022 0-1.47-3.122-1.895-13.25-.86-20.47-5.313-35.317-14.44-48.137-3.043-4.273-3.34-5.2-2.355-7.36.965-2.116 1.588-2.38 4.348-1.847 1.772.343 13.12.898 25.22 1.233 23.556.653 37.907-.64 50.462-4.548l5.878-1.83 4.31 4.39c4.01 4.088 4.21 4.544 2.9 6.62-15.565 24.672-28.27 60.768-37.65 106.98-2.72 13.4-2.856 13.748-5.345 13.67-1.405-.042-3.004-.228-3.554-.41zm-175.005-91.76C145.636 110.9 183.1 57.2 247.162 31.89c26.093-10.307 61.886-14.512 89.115-10.47 31.426 4.667 64.215 19.65 87.995 40.208 20.27 17.526 38.542 44.37 48.377 71.077 6.01 16.32 11.064 41.47 11.064 55.062v6.12h-89.78l3.39-7.84c6.323-14.624 7.752-21.84 7.752-39.16 0-12.713-.382-16.878-2.12-23.174-5.005-18.112-13.303-32.763-25.6-45.2-11.933-12.073-27.69-21.282-44.142-25.802-6.732-1.85-10.693-2.205-25-2.25-14.625-.045-18.187.265-25.5 2.22-9.2 2.458-24.365 9.3-31.504 14.21-13.133 9.037-25.597 24.858-31.364 39.813-5.824 15.1-7.674 35.65-4.707 52.28 1.257 7.055 6.17 22.4 9.972 31.155l1.63 3.75h-88.149l.616-7.25z"
                    fill="rgba(51,51,51,.5)"
                />
            </svg>
        </div>
        <div style="flex: 5; -webkit-flex: 5;">
            <div style="display: table;">
                <div style="display: table-row; width: auto;">
                    <div style="display: table-cell; width: auto; text-align: right;">Date:</div>
                    <div style="display: table-cell; width: 100%; padding-left: 8px;">31 Aug 2018</div>
                </div>
                <div style="display: table-row; width: auto;">
                    <div style="display: table-cell; width: auto; text-align: right;">Time:</div>
                    <div style="display: table-cell; width: 100%; padding-left: 8px;">08:00 - 09:00</div>
                </div>
                <div style="display: table-row; width: auto;">
                    <div style="display: table-cell; width: auto; text-align: right;">Duration:</div>
                    <div style="display: table-cell; width: 100%; padding-left: 8px;">60 minutes</div>
                </div>
                <div style="display: table-row; width: auto;">
                    <div style="display: table-cell; width: auto; text-align: right;">&nbsp;</div>
                    <div style="display: table-cell; width: 100%; padding-left: 8px;"></div>
                </div>
            </div>
        </div>
        <div style="flex: 6; -webkit-flex: 6;">
            <div style="display: table;">
                <div style="display: table-row; width: auto;">
                    <div style="display: table-cell; width: auto; text-align: right;">Course:</div>
                    <div style="display: table-cell; width: 100%; padding-left: 8px;">ENG - General English</div>
                </div>
                <div style="display: table-row; width: auto;">
                    <div style="display: table-cell; width: auto; text-align: right;">Location:</div>
                    <div style="display: table-cell; width: 100%; padding-left: 8px;">Bloc - Block Zašovská</div>
                </div>
                <div style="display: table-row; width: auto;">
                    <div style="display: table-cell; width: auto; text-align: right;">Group:</div>
                    <div style="display: table-cell; width: 100%; padding-left: 8px;">BLOC - BLOCK Potěšil Tomáš</div>
                </div>
                <div style="display: table-row; width: auto;">
                    <div style="display: table-cell; width: auto; text-align: right;">Teacher:</div>
                    <div style="display: table-cell; width: 100%; padding-left: 8px;">JaLa - Jana LaSalle</div>
                </div>
            </div>
        </div>
    </div>
    <h1 style="margin: 32px 0 8px 0;">Lesson Plan</h1>
    <div style="width: 100%; border-bottom: 1px solid rgba(51,51,51,.5);"></div>
    <div style="padding: 16px 32px;">
        <div style="display: table;">
            <div style="display: table-row; width: auto;">
                <div style="display: table-cell; width: auto; text-align: right;"><strong>Title:</strong></div>
                <div style="display: table-cell; width: 100%; padding-left: 8px;">11B E.File elementary (he does not have the book)</div>
            </div>
            <div style="display: table-row; width: auto;">
                <div style="display: table-cell; width: auto; text-align: right;"><strong>Focus:</strong></div>
                <div style="display: table-cell; width: 100%; padding-left: 8px;">-</div>
            </div>
            <div style="display: table-row; width: auto;">
                <div style="display: table-cell; width: auto; text-align: right;"><strong>Topic:</strong></div>
                <div style="display: table-cell; width: 100%; padding-left: 8px;">-</div>
            </div>
            <div style="display: table-row; width: auto;">
                <div style="display: table-cell; width: auto; text-align: right;"><strong>Materials:</strong></div>
                <div style="display: table-cell; width: 100%; padding-left: 8px;">-</div>
            </div>
        </div>
    </div>
    <div style="padding: 16px; background: rgba(31,31,31,.04); border: 1px solid rgba(51,51,51,.5); border-radius: 2.5mm;">
        <h3 style="padding: 0; margin: 0 0 6mm 0;">Games & Activities</h3>
        <div class="flex" style="border-bottom: 1mm dashed #fff; margin: 2mm 6mm 0 6mm; padding-bottom: 2mm;">
            <div style="flex: 1; -webkit-flex: 1; padding-left: 4mm;">5 minutes</div>
            <div style="flex: 2; -webkit-flex: 2;"><strong>Find who</strong></div>
            <div style="flex: 1; -webkit-flex: 1; padding-right: 4mm; text-align: right; color: rgba(51,51,51,.5);"><div style="display: inline-block; width: 4mm; height: 4mm; border: 1px solid rgba(51,51,51,.5); border-radius: 3px;"></div> Done</div>
        </div>
        <div class="flex" style="border-bottom: 1mm dashed #fff; margin: 2mm 6mm 0 6mm; padding-bottom: 2mm;">
            <div style="flex: 1; -webkit-flex: 1; padding-left: 4mm;">5 minutes</div>
            <div style="flex: 2; -webkit-flex: 2;"><strong>Spot the lie</strong></div>
            <div style="flex: 1; -webkit-flex: 1; padding-right: 4mm; text-align: right; color: rgba(51,51,51,.5);"><div style="display: inline-block; width: 4mm; height: 4mm; border: 1px solid rgba(51,51,51,.5); border-radius: 3px;"></div> Done</div>
        </div>
        <div class="flex" style="margin: 2mm 6mm 0 6mm;">
            <div style="flex: 1; -webkit-flex: 1; padding-left: 4mm;">5 minutes</div>
            <div style="flex: 2; -webkit-flex: 2;"><strong>Driving in Canada</strong></div>
            <div style="flex: 1; -webkit-flex: 1; padding-right: 4mm; text-align: right; color: rgba(51,51,51,.5);"><div style="display: inline-block; width: 4mm; height: 4mm; border: 1px solid rgba(51,51,51,.5); border-radius: 3px;"></div> Done</div>
        </div>
    </div>
            </body>
        </html>
    `

    const lessonPlan = createPdfFile(html, {
        format: 'A4',
        border: '1.25cm',
        header: {
            height: '25px',
            contents: `
                <div style="text-align: right;">
                    Page {{page}} of total {{pages}}
                </div>
            `,
        },
    })

    const headers = {}

    if (forceDownload) {
        headers['Content-Type'] = 'application/force-download'
        // headers['Content-Disposition'] = 'attachment; filename=' + normalizeString('lesson-plan') + '.pdf'
        headers['Content-Disposition'] = 'attachment; filename=lesson-plan.pdf'
    } else {
        headers['Content-Type'] = 'application/pdf'
    }

    res.writeHead(200, headers)

    const stream = await getStreamFromPdfFile(lessonPlan)
    stream.on('end', () => {
        return res.end()
    })
    stream.pipe(res)
}

function getStreamFromPdfFile(file: any): Promise<fs.ReadStream> {
    return new Promise((resolve, reject) => {
        file.toStream((error, stream) => {
            if (error) {
                return reject(error)
            }
            return resolve(stream)
        })
    })
}

const lampaLogoHtml = `
    <img
        id="logo"
        width="90"
        height="76"
        src="data:image/jpeg;base64,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"
    />
`
