"use client";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function StudentDashboard() {
  const router = useRouter()
  const { id } = router.query

  type Student = {
    full_name: string
    total_lessons: number
    study_hours: number
    study_days: number
    country: string
    assigned_teacher: string
    start_date: string
  }

  const [student, setStudent] = useState<Student | null>(null)

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .eq('id', id)
          .single()

        if (!error) setStudent(data)
      }

      fetchData()
    }
  }, [id])

  if (!student) return <p>جارٍ تحميل البيانات...</p>

  return (
    <div>
      <h1>مرحبا {student.full_name}</h1>
      <p>الدروس الكلية: {student.total_lessons}</p>
      <p>عدد الساعات: {student.study_hours}</p>
      <p>عدد الأيام: {student.study_days}</p>
      <p>الدولة: {student.country}</p>
      <p>اسم المعلم: {student.assigned_teacher}</p>
      <p>تاريخ البداية: {student.start_date}</p>
    </div>
  )
}
