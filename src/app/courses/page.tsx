'use client';
import { DndContext } from '@dnd-kit/core';
import { Button, Chip, Snackbar } from '@mui/joy';
import Table from '@mui/joy/Table';
import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle } from 'react-feather';
import { useDroppable } from '@dnd-kit/core';
import { useDraggable, DragEndEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Course } from '@/types/course';
import { categories } from '@/const/funnel';
import { Funnel, FunnelCategory } from '@/types/funnels';


export function Droppable(props: { id: string; funnel: Funnel; courseStore: Course[], courses: Course[] }) {
    const { isOver, active, setNodeRef } = useDroppable({
        id: props.id,
    });

    const isValid = active ? props.funnel.matcher(props.courseStore.find(mod => active.id == mod.raw_id)!): undefined;

    const style: CSSProperties = {
        backgroundColor: active ? (isValid ? '#d1ffcf' : '#ebebeb'): '#ffffff',
        height: '100%',
    };

    return (
        <div ref={setNodeRef} style={style}>
            <div className='flex flex-col gap-2 h-full'>
                {props.courses.map(course => (
                    <Draggable key={course.name} course={course} />
                ))}
            </div>
        </div>
    );

}
function Draggable(props: { course: Course }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: props.course.raw_id,
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <tr ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Chip variant='outlined' size='sm'><span className='font-mono'>{props.course.raw_id}</span> - {props.course.credits}學分</Chip>
        </tr>
    );
}
const CoursesPage = () => {
    const [open, setOpen] = useState(false);

    const getType = (type: string) => {
        switch (type) {
            case 'normal': return '清大修課';
        }
    }

    const inputCourses: Course[] = [
        {
            raw_id: 'CS  233402',
            type: 'normal',
            name: '線性代數',
            credits: 3,
        },
        {
            raw_id: 'CS  235102',
            type: 'normal',
            name: '資料結構',
            credits: 3,
        },
        {
            raw_id: 'CS  423500',
            type: 'normal',
            name: '物聯網概論',
            credits: 3,
        },
        {
            raw_id: 'EE  221002',
            type: 'normal',
            name: '電路學',
            credits: 3,
        },
        {
            raw_id: 'EECS302001',
            type: 'normal',
            name: '計算機網路概論',
            credits: 3,
        },
        {
            raw_id: 'FL  201110',
            type: 'normal',
            name: '初級日語一',
            credits: 3,
        },
        {
            raw_id: 'GE  108200',
            type: 'normal',
            name: '從日常到科幻的有趣物理學',
            credits: 2,
        },
        {
            raw_id: 'EE  223001',
            type: 'normal',
            name: '邏輯設計實驗',
            credits: 2,
        },
        {
            raw_id: 'EECS121000',
            type: 'normal',
            name: 'Python語言程式入門',
            credits: 3,
        },
        {
            raw_id: 'EECS203002',
            type: 'normal',
            name: '常微學分方程',
            credits: 3,
        },
        {
            raw_id: 'GE  115500',
            type: 'normal',
            name: '創新創意與創業',
            credits: 2,
        },
        {
            raw_id: 'GE  187400',
            type: 'normal',
            name: '清華人的國際行動力培力',
            credits: 2,
        },
        {
            raw_id: 'MATH102007',
            type: 'normal',
            name: '微積學分Ａ二',
            credits: 4,
        },
        {
            raw_id: 'PE  206096',
            type: 'normal',
            name: '羽球初學',
            credits: 0,
        },
        {
            raw_id: 'PE  2060961',
            type: 'normal',
            name: '羽球初學',
            credits: 0,
        },
        {
            raw_id: 'PE  2060962',
            type: 'normal',
            name: '羽球初學',
            credits: 0,
        },
        {
            raw_id: 'PE  2060963',
            type: 'normal',
            name: '羽球初學',
            credits: 0,
        },
        {
            raw_id: 'PE  2060964',
            type: 'normal',
            name: '羽球初學',
            credits: 0,
        },
        {
            raw_id: 'PHYS114301',
            type: 'normal',
            name: '普通物理Ｂ二',
            credits: 3,
        },
        {
            raw_id: 'PME 101702',
            type: 'normal',
            name: '機械設計製圖',
            credits: 3,
        },
        {
            raw_id: 'ZY  1002222',
            type: 'normal',
            name: '服務學習--黃昏的邂逅：建功高中課輔',
            credits: 0,
        },
        {
            raw_id: 'ZZ  000000',
            type: 'normal',
            name: '操行',
            credits: 0,
        },
        {
            raw_id: 'CL  101039',
            type: 'normal',
            name: '大學中文',
            credits: 2,
        },
        {
            raw_id: 'CS  233601',
            type: 'normal',
            name: '離散數學',
            credits: 3,
        },
        {
            raw_id: 'EE  231001',
            type: 'normal',
            name: '計算機程式設計',
            credits: 3,
        },
        {
            raw_id: 'EECS101001',
            type: 'normal',
            name: '邏輯設計',
            credits: 3,
        },
        {
            raw_id: 'MATH101007',
            type: 'normal',
            name: '微積學分Ａ一',
            credits: 4,
        },
        {
            raw_id: 'PE  111027',
            type: 'normal',
            name: '大一體育',
            credits: 0,
        },
        {
            raw_id: 'PHYS101010',
            type: 'normal',
            name: '普通物理實驗一',
            credits: 1,
        },
        {
            raw_id: 'PHYS113301',
            type: 'normal',
            name: '普通物理Ｂ一',
            credits: 3,
        },
        {
            raw_id: 'ZY  1002221',
            type: 'normal',
            name: '服務學習--黃昏的邂逅：建功高中課輔',
            credits: 0,
        }
    ]

    // const inputCourses: Course[] = [
    //     {
    //         raw_id: 'PHYS113306',
    //         type: 'normal',
    //         name: '普通物理Ｂ一',
    //         credits: 3,
    //     },
    //     {
    //         raw_id: 'PHYS101009',
    //         type: 'normal',
    //         name: '普通物理實驗一',
    //         credits: 1,
    //     },
    //     {
    //         raw_id: 'PE  111027',
    //         type: 'normal',
    //         name: '大一體育',
    //         credits: 0,
    //     },
    //     {
    //         raw_id: 'MATH101006',
    //         type: 'normal',
    //         name: '微積學分Ａ一',
    //         credits: 4,
    //     },
    //     {
    //         raw_id: 'LANG101010',
    //         type: 'normal',
    //         name: '中高級英文一',
    //         credits: 2,
    //     },
    //     {
    //         raw_id: 'EECS101003',
    //         type: 'normal',
    //         name: '邏輯設計',
    //         credits: 3,
    //     },
    //     {
    //         raw_id: 'EE  231001',
    //         type: 'normal',
    //         name: '計算機程式設計',
    //         credits: 3,
    //     },
    //     {
    //         raw_id: 'CL  101043',
    //         type: 'normal',
    //         name: '大學中文',
    //         credits: 2,
    //     },
    //     {
    //         raw_id: 'ZY  100222',
    //         type: 'normal',
    //         name: '服務學習--黃昏的邂逅：建功高中課輔',
    //         credits: 0,
    //     },
    //     {
    //         raw_id: 'PHYS114306',
    //         type: 'normal',
    //         name: '普通物理Ｂ二',
    //         credits: 3,
    //     },
    //     {
    //         raw_id: 'PE  206090',
    //         type: 'normal',
    //         name: '羽球初學',
    //         credits: 0,
    //     },
    //     {
    //         raw_id: 'MATH102006',
    //         type: 'normal',
    //         name: '微積學分Ａ二',
    //         credits: 4,
    //     },
    //     {
    //         raw_id: 'LANG102010',
    //         type: 'normal',
    //         name: '中高級英文二',
    //         credits: 2,
    //     },
    //     {
    //         raw_id: 'GE  125700',
    //         type: 'normal',
    //         name: '聖經與人生',
    //         credits: 2,
    //     },
    //     {
    //         raw_id: 'FL  344500',
    //         type: 'normal',
    //         name: '從《哈利波特》學英文',
    //         credits: 2,
    //     },
    //     {
    //         raw_id: 'EECS207001',
    //         type: 'normal',
    //         name: '邏輯設計實驗',
    //         credits: 2,
    //     },
    //     {
    //         raw_id: 'EECS203002',
    //         type: 'normal',
    //         name: '常微學分方程',
    //         credits: 3,
    //     },
    //     {
    //         raw_id: 'ZY  100034',
    //         type: 'normal',
    //         name: '服務學習--校園國際交換生服務計畫',
    //         credits: 0,
    //     },
    //     {
    //         raw_id: 'PE  205020',
    //         type: 'normal',
    //         name: '速度、敏捷及反應訓練',
    //         credits: 0,
    //     },
    //     {
    //         raw_id: 'LE  130101',
    //         type: 'normal',
    //         name: '基礎泰語一',
    //         credits: 3,
    //     },
    //     {
    //         raw_id: 'GEC 150402',
    //         type: 'normal',
    //         name: '前近代科學史',
    //         credits: 3,
    //     },
    //     {
    //         raw_id: 'GEC 110700',
    //         type: 'normal',
    //         name: '思想經典：存在主義經典選讀',
    //         credits: 2,
    //     },
    //     {
    //         raw_id: 'EECS203001',
    //         type: 'normal',
    //         name: '常微學分方程',
    //         credits: 3,
    //     },
    //     {
    //         raw_id: 'LANG200038',
    //         type: 'normal',
    //         name: '中高級選讀英文-小說選讀',
    //         credits: 2,
    //     },
    //     {
    //         raw_id: 'GEC 140401',
    //         type: 'normal',
    //         name: '全球政治經濟學',
    //         credits: 3,
    //     },
    //     {
    //         raw_id: 'GE  178200',
    //         type: 'normal',
    //         name: '針灸與近代科學',
    //         credits: 2,
    //     },
    //     {
    //         raw_id: 'EECS202001',
    //         type: 'normal',
    //         name: '訊號與系統',
    //         credits: 3,
    //     },
    //     {
    //         raw_id: 'EE  223001',
    //         type: 'normal',
    //         name: '邏輯設計實驗',
    //         credits: 2,
    //     },
    //     {
    //         raw_id: 'CS  333202',
    //         type: 'normal',
    //         name: '機率',
    //         credits: 3,
    //     },
    //     {
    //         raw_id: 'EECS205000',
    //         type: 'normal',
    //         name: '線性代數',
    //         credits: 3,
    //     },
    // ]

    
    const overrides = [
        {
            target: 'funnel',
            target_id: "英文領域",
            action: 'disable',
            name: '免修英文'
        },
        {
            target: 'course',
            target_id: "CS  235102",
            action: 'replace',
            name: '免修課程',
            data: {
                raw_id: 'LANG101010',
                type: 'normal',
                name: '中高級英文一',
                credits: 2,
            }
        }
    ]

    const [courseStore, setCourseStore] = useState<(Course & { parent?: string })[]>(inputCourses);

    // now we should funnel the courses into the categories
    // first create a copy of inputCourses
    // then in each category, for each funnel, try to match all the courses in the copy of inputCourses
    // create a new array that contains the { category: { funnel, course[] }} pair
    // then remove the course from the copy of inputCourses
    // repeat until we matched all funnels
    // return the array of { category: { funnel, course[] }} pair
    // and the array of unmatched courses

    const autoMatchCourses = (categories: FunnelCategory[], courses: Course[]) => {
        const copy = [...courses];
        const newCourseStore: (Course & { parent?: string })[] = [...courses];
        categories.map(category => {
            if(category.disabled) return;
            category.funnels.map(funnel => {
                if(funnel.disabled) return;
                const matchedCourses = copy.filter(course => funnel.matcher(course));
                matchedCourses.forEach(course => {
                    const index = newCourseStore.findIndex(c => c.raw_id == course.raw_id);
                    newCourseStore[index].parent = funnel.name;
                });

                const unmatchedCourses = copy.filter(course => !funnel.matcher(course));
                copy.splice(0, copy.length, ...unmatchedCourses);
            });
        });
        setCourseStore(newCourseStore);
    }

    useEffect(() => {
        //create copy of inputCourses and categories
        const categoriesCopy = [...categories];
        const courseCopy = [...inputCourses];
        //then handle overrides first
        overrides.forEach(override => {
            if (override.target == 'funnel') {
                // for each category, for each funnel, if funnel.name == override.target_id, then disable the funnel
                categoriesCopy.forEach(category => {
                    category.funnels.forEach(funnel => {
                        if (funnel.name == override.target_id) {
                            funnel.disabled = true;
                        }
                    })
                })
            } else if (override.target == 'course') {
                const index = courseCopy.findIndex(course => course.raw_id == override.target_id);
                if (index != -1) {
                    courseCopy[index] = override.data!;
                }
            }
        });

        autoMatchCourses(categoriesCopy, courseCopy);
    }, []);

    //move calculating the sums to this new function
    const funnelsWithSum = () => {
        return categories.map(category => {
            if(category.disabled) return { ...category, funnels: category.funnels.map(funnel => ({ ...funnel, sum: 0, valid: true })), sum: 0, valid: true };
            const catfun = category.funnels.map(funnel => {
                if(funnel.disabled) return { ...funnel, sum: 0, valid: true };
                
                const matchedCourses = courseStore.filter(course => course.parent == funnel.name);
                if (funnel.countType == 'course') {
                    const sum = matchedCourses.length;
                    const valid = funnel.minCount ? (sum >= funnel.minCount) : true;
                    return { ...funnel, sum, valid };
                } else {
                    const sum = matchedCourses.reduce((acc, cur) => acc + cur.credits, 0);
                    const valid = funnel.minCount ? (sum >= funnel.minCount) : true;
                    return { ...funnel, sum, valid };
                }
            })
            if (category.countType) {
                const sum = catfun.reduce((acc, cur) => {
                    if(cur.disabled) return acc + (cur.minCount || 0);
                    const matchedCourses = courseStore.filter(course => course.parent == cur.name);
                    if (category.countType == 'course') {
                        return acc + matchedCourses.length;
                    } else {
                        return acc + matchedCourses.reduce((acc, cur) => acc + cur.credits, 0);
                    }
                }, 0);
                const valid = category.minCount ? (sum >= category.minCount) : true;
                return { ...category, funnels: catfun, sum, valid };
            }
            return { ...category, funnels: catfun };
        })
    }

    const moveCourse = (courseId: string, to: string | undefined) => {
        //get the to funnel
        if (to) {
            let toFunnel: Funnel | undefined = undefined;
            categories.forEach(category => {
                const funnel = category.funnels.find(funnel => funnel.name == to);
                if (funnel) {
                    toFunnel = funnel;
                }
            });
            //check if the course can be matched to the funnel
            const course = courseStore.find(course => course.raw_id == courseId);
            if (!toFunnel!.matcher(course!)) {
                setOpen(true);
                return;
            }
        }
        setCourseStore(courseStore => {
            const newCourseStore = [...courseStore];
            const index = newCourseStore.findIndex(c => c.raw_id == courseId);
            newCourseStore[index].parent = to;
            return newCourseStore;
        });
    }

    //if courseStore is updated, we should recalculate the sums
    const funnelResults = useMemo(() => {
        return funnelsWithSum();
    }, [courseStore]);

    function handleDragEnd(props: DragEndEvent) {
        moveCourse(props.active.id as string, props.over?.id as string)
    }


    return <div className="flex flex-col">
        <DndContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    {funnelResults.map(category => (
                        <div key={category.title} className="flex flex-col rounded-lg">
                            <div className='py-2 px-4 bg-gray-50 flex flex-row gap-2 items-center'>
                                <span className=''>{category.title}</span>
                                {category.countType &&
                                // @ts-ignore
                                    (category.valid ?
                                        <CheckCircle color='green' size={16} /> :
                                        <AlertTriangle color='red' size={16} />
                                    )}
                            </div>
                            <Table aria-label="basic table" size='sm'>
                                <thead>
                                    <tr>
                                        <td className='w-12'>狀態</td>
                                        <td>科目</td>
                                        <td className='w-32'>修課記錄</td>
                                        <td className='w-14'>缺</td>
                                        <td>動作</td>
                                    </tr>
                                </thead>
                                <tbody> 
                                    {category.funnels.map(fr => !fr.disabled ? 
                                    <tr key={fr.name}>
                                        <td>
                                            {fr?.minCount &&
                                                (fr.valid ?
                                                    <CheckCircle color='green' size={16} /> :
                                                    <AlertTriangle color='red' size={16} />
                                                )}
                                        </td>
                                        <td>{fr.name}</td>
                                        <td>
                                            <Droppable id={fr.name} funnel={fr} courses={courseStore.filter(mod => mod.parent == fr.name)} courseStore={courseStore} />
                                        </td>
                                        <td>{fr?.minCount ? (fr.minCount - fr.sum) : ''} {fr.countType == 'course' ? "堂" : "學分"}</td>
                                        <td>
                                            {!fr.valid && <Button variant="soft" color="neutral" size='sm'>申請免修</Button>}
                                        </td>
                                    </tr>:
                                    <tr>
                                        <td>
                                            <CheckCircle color='green' size={16} />
                                        </td>
                                        <td>{fr.name}</td>
                                        <td>免修</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col self-start sticky top-0">
                    <div className="flex flex-col rounded-lg">
                        <div className='py-2 px-4 bg-gray-50'>
                            其餘選修
                        </div>
                        <Table aria-label="basic table">
                            <thead>
                                <tr>
                                    <td>課號</td>
                                    <td>課名</td>
                                    <td>科類</td>
                                </tr>
                            </thead>
                            <tbody>
                                {courseStore.filter(mod => !mod.parent).map((course) => (
                                    <tr key={course.name}>
                                        <td>
                                            <Draggable course={course} />
                                        </td>
                                        <td>{course.name}</td>
                                        <td>{getType(course.type)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </DndContext>
        <Snackbar
            autoHideDuration={4000}
            open={open}
            variant={'soft'}
            color={'danger'}
            onClose={(event, reason) => {
                setOpen(false);
            }}
        >
            Course cannot be moved here. Please check the requirements.
        </Snackbar>
    </div>
}

export default CoursesPage;