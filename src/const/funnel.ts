import { Course } from "@/types/course";
import { FunnelCategory } from "@/types/funnels";


export const categories: FunnelCategory[] = [
    {
        title: '校訂必修',
        minCount: 10,
        countType: 'credits',
        funnels: [
            // 大學中文 2
            // 英文領域 8 通過本校訂定之英語能力檢定考試者，得免修選讀英文 2 學分
            // 通 識 課 程
            //     核心必修 8-12 學生須於四個不同的核心向度中，至少各選一門課，須修畢至少四
            //     門核心課程
            //     選修科目 8-12 學生自由選修課程
            //     合 計 20
            // 體育 0 1 至 3 年級必修
            // 服務學習 0 畢業前必修 60 小時
            {
                name: '大學中文',
                matcher: (course: Course) => course.raw_id.startsWith('CL  1010'),
                countType: 'credits',
                minCount: 2,
            },
            {
                name: '英文領域',
                matcher: (course: Course) => course.raw_id.startsWith('LANG'),
                countType: 'credits',
                minCount: 8,
            },
            {
                name: '大一體育',
                matcher: (course: Course) => course.raw_id.startsWith('PE  1110'),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '體育',
                matcher: (course: Course) => course.raw_id.startsWith('PE') && !course.raw_id.startsWith('PE  1110'),
                countType: 'course',
                minCount: 5,
            },
            {
                name: '服務學習',
                matcher: (course: Course) => course.raw_id.startsWith('ZY'),
                countType: 'course',
                minCount: 2,
            },
        ]
    },
    {
        title: '通識課',
        countType: 'credits',
        minCount: 20,
        funnels: [
            {
                name: '選修通識',
                matcher: (course: Course) => course.raw_id.startsWith('GE') || course.raw_id.startsWith('GEC'),
                countType: 'credits',
                minCount: 12,
            },
            {
                name: '核心通識',
                matcher: (course: Course) => course.raw_id.startsWith('GEC'),
                countType: 'credits',
                minCount: 12,
            },
        ]
    },
    {
        title: '班定必修',
        // 微積分一 微積分二 4 4 MATH1010，一年級
        // 普通物理一 普通物理二 3 3 PHYS1133，一年級
        // 普通物理實驗一 1 PHYS1010，一年級
        // 計算機程式設計或計算機程式
        // 設計一 3 CS 1355 或 EE 2310，一年級
        // 邏輯設計 3 EECS1010，一年級
        // 離散數學 3 CS2336 或 EE2060，一年級或二年級(建議)
        // 常微分方程 3 EECS2030，一年級或二年級(建議)
        // 線性代數 3 CS2334 或 EE2030，一年級或二年級(建議)
        // 機率 3 CS3332 或 EE3060，二年級或三年級(建議)
        // 訊號與系統 3 EECS2020，二年級或三年級(建議)
        // 實作專題一或系統整合實作一 1-2 CS3901(三年級下學期)或 EE3900(三年級)
        // 實作專題二或系統整合實作二 2 CS3902 或 EE3910，四年級
        // 實驗 4
        // EECS2070 及 EE2230 邏輯設計實驗、CS2104 硬體設
        // 計與實驗、CS2410 軟體設計與實驗、EECS2010 計算
        // 機程式設計實作、EE4150 光電實驗、EE2245 電子電
        // 路實驗、EE2405 嵌入式系統與實驗、EE3662 數位訊
        // 號處理實驗、EE3840 電動機械實驗、EE4292 積體電
        // 路設計實驗、EE4320 固態電子實驗、EE4650 通訊系
        // 統實驗、CS3428 高等程式設計實作、EECS2080 軟體
        // 實驗
        funnels: [
            {
                name: '微積分 1',
                matcher: (course: Course) => course.raw_id.startsWith('MATH1010'),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '微積分 2',
                matcher: (course: Course) => course.raw_id.startsWith('MATH1020'),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '普通物理 1',
                matcher: (course: Course) => course.raw_id.startsWith('PHYS1133'),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '普通物理 2',
                matcher: (course: Course) => course.raw_id.startsWith('PHYS1143'),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '普通物理實驗 1',
                matcher: (course: Course) => course.raw_id.startsWith('PHYS1010'),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '計算機程式設計',
                matcher: (course: Course) => ['CS  1355', 'EE  2310'].some(code => code == course.raw_id.substring(0, 8)),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '邏輯設計',
                matcher: (course: Course) => course.raw_id.startsWith('EECS1010'),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '離散數學',
                matcher: (course: Course) => ['CS  2336', 'EE  2060'].some(code => code == course.raw_id.substring(0, 8)),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '常微分方程',
                matcher: (course: Course) => course.raw_id.startsWith('EECS2030'),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '線性代數',
                matcher: (course: Course) => ['CS  2334', 'EE  2030'].some(code => code == course.raw_id.substring(0, 8)),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '機率',
                matcher: (course: Course) => ['CS  3332', 'EE  3060'].some(code => code == course.raw_id.substring(0, 8)),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '訊號與系統',
                matcher: (course: Course) => course.raw_id.startsWith('EECS2020'),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '實作專題一',
                matcher: (course: Course) => ['CS  3901', 'EE  3900'].some(code => code == course.raw_id.substring(0, 8)),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '實作專題二',
                matcher: (course: Course) => ['CS  3902', 'EE  3910'].some(code => code == course.raw_id.substring(0, 8)),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '實驗',
                matcher: (course: Course) => ['EECS2070', 'EE  2230', 'CS  2104', 'CS  2410', 'EECS2010', 'EE  4150', 'EE  2245', 'EE  2405', 'EE  3662', 'EE  3840', 'EE  4292', 'EE  4320', 'EE  4650', 'CS  3428', 'EECS2080'].some(code => code == course.raw_id.substring(0, 8)),
                countType: 'course',
                minCount: 4,
            }
        ]
    },
    {
        title: '核心選修',
        countType: 'credits',
        minCount: 15,
        funnels: [
            // 計算機程式設計二 3 CS1356，一年級(建議)
            // 電路學 3 EE2210，二年級(建議)
            // 電子學 3 EE2255，二年級(建議)
            // 電磁學 3 EE2140，二年級(建議)
            // 資料結構 3 CS2351 或 EE2410，二年級(建議)
            // 計算機結構 3 EECS4030 或 CS4100 或 EE3450，二年級或三年級(建議)
            // 計算機網路概論 3 EECS3020，二年級或三年級(建議)
            // 作業系統 3 CS3423，三年級(建議)
            // 嵌入式系統概論 3 CS4101，三年級或四年級(建議)
            // 計算方法設計或演算法 3 EECS4020 或 CS4311 或 EE3980，三年級(建議)
            // 企業實習 0 EECS3010，二年級或三年級(建議)
            {
                name: '計算機程式設計二',
                matcher: (course: Course) => course.raw_id.startsWith('CS  1356'),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '電路學',
                matcher: (course: Course) => course.raw_id.startsWith('EE  2210'),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '電子學',
                matcher: (course: Course) => course.raw_id.startsWith('EE  2255'),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '電磁學',
                matcher: (course: Course) => course.raw_id.startsWith('EE  2140'),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '資料結構',
                matcher: (course: Course) => ['CS  2351', 'EE  2410'].some(code => code == course.raw_id.substring(0, 8)),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '計算機結構',
                matcher: (course: Course) => ['EECS4030', 'CS  4100', 'EE  3450'].some(code => code == course.raw_id.substring(0, 8)),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '計算機網路概論',
                matcher: (course: Course) => course.raw_id.startsWith('EECS3020'),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '作業系統',
                matcher: (course: Course) => course.raw_id.startsWith('CS  3423'),
                countType: 'course',
                minCount: 1,
            },
            {
                name: '嵌入式系統概論',
                matcher: (course: Course) => course.raw_id.startsWith('CS  4101'),
                countType: 'course',
                minCount: 1,
            }
        ]
    },
    {
        title: '專業選修',
        countType: 'credits',
        minCount: 27,
        funnels: [
            {
                name: '電力系統與控制系統學程',
                matcher: (course: Course) => [
                    'EE  3820',
                    'EE  4710',
                    'EE  5820',
                    'EE  4830',
                    'EE  4840',
                    'EE  3510',
                    'EE  5850',
                    'EE  3840',
                    'EE  2255',
                    'EE  2210',
                    'EE  2140',
                ].some(code => code == course.raw_id.substring(0, 8)),
                countType: 'credits',
            },
            {
                name: '微電子與半導體學程',
                matcher: (course: Course) => [
                    'EE  2110',
                    'EE  3235',
                    'EE  4280',
                    'EE  3350',
                    'EE  4120',
                    'EECS4010',
                    'EE  4320',
                    'EE  5280',
                    'ENE 5250',
                    'ENE 5310',
                    'EE  2255',
                    'EE  2210',
                    'EE  2140',
                ].some(code => code == course.raw_id.substring(0, 8)),
                countType: 'credits',
            },
            {
                name: '光電工程學程',
                matcher: (course: Course) => [
                    'EE  3130',
                    'EE  3360',
                    'EE  2110',
                    'EE  3150',
                    'EE  2020',
                    'EE  3350',
                    'EE  4120',
                    'EE  4135',
                    'EE  4150',
                    'EE  2140',
                ].some(code => code == course.raw_id.substring(0, 8)),
                countType: 'credits',
            },
            {
                name: '通訊與網路學程',
                matcher: (course: Course) => [
                    'CS  1356',
                    'CS  4233',
                    'CS  3211',
                    'COM 5120',
                    'EE  3640',
                    'EE  4640',
                    'EE  3660',
                    'COM 5310',
                    'CS  3305',
                    'COM 5335',
                    'EECS3020',
                    'CS  4101',
                ].some(code => code == course.raw_id.substring(0, 8)),
                countType: 'credits',
            },
            {
                name: '人工智慧學程',
                matcher: (course: Course) => [
                    'CS  4601',
                    'CS  4602',
                    'EE  3700',
                    'EE  6550',
                    'CS  5732',
                    'CS  5701',
                    'COM 5250',
                    'ISA 5810',
                    'ISA 5621',
                    'CS  5631',
                    'CS  4520',
                    'EE  6630',
                    'COM 5260',
                    'CS  5656',
                    'CS  5540',
                    'CS  6550',
                    'EE  6485',
                    'CS  4461',
                    'EECS2040',
                    'CS  2351',
                    'EE  2410',
                ].some(code => code == course.raw_id.substring(0, 8)),
                countType: 'credits',
            },
            {
                name: '多媒體學程',
                matcher: (course: Course) => [
                    'CS  4520',
                    'CS  3570',
                    'CS  3330',
                    'CS  4710',
                    'CS  4601',
                    'CS  5503',
                    'CS  6550',
                    'CS  5540',
                    'CS  5620',
                    'CS  5500',
                    'CS  4461',
                ].some(code => code == course.raw_id.substring(0, 8)),
                countType: 'credits',
            },
            {
                name: '數位訊號處理學程',
                matcher: (course: Course) => [
                    'EE  3660',
                    'EE  3640',
                    'EE  4640',
                    'CS  4602',
                    'EE  3700',
                    'EE  6550',
                    'EE  4410',
                    'CS  4520',
                    'EE  5630',
                    'EE  6641',
                ].some(code => code == course.raw_id.substring(0, 8)),
                countType: 'credits',
            },
            {
                name: '電腦架構、IC設計、設計自動化學程',
                matcher: (course: Course) => [
                    'CS  3120',
                    'EE  3230',
                    'EECS4010',
                    'CS  3130',
                    'EECS2070',
                    'CS  3371',
                    'EE  3235',
                    'CS  3404',
                    'CS  6135',
                    'EE  5280',
                    'ECS2040',
                    'CS  2351',
                    'EE  2410',
                    'CS  4100',
                    'EE  3450',
                    'EE  2255',
                    'EE  2210',
                    'CS  4101',
                    'EECS4020',
                    'CS  4311',
                    'EE  3980',
                ].some(code => code == course.raw_id.substring(0, 8)),
                countType: 'credits',
            },
            {
                name: '生醫電子學程',
                matcher: (course: Course) => [
                    'LS  1103',
                    'LSC 1101',
                    'LSC 1102',
                    'EE  2020',
                    'EE  3235',
                    'EE  3660',
                    'EE  4410',
                    'EE  3510',
                    'EE  3640',
                    'EE  3990',
                    'EE  4296',
                    'EE  6540',
                    'EE  5510',
                    'ENE 5400',
                    'EE  3662',
                    'EE  4150',
                ].some(code => code == course.raw_id.substring(0, 8)),
                countType: 'credits',
            }
        ]
    }
]