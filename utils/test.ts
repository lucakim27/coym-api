export const getTest = function (pool: any, res: any, req: any) {

    const result: any = {
        mbti: [],
        hobby: [],
        subject: []
    }

    switch (req.query.mbti) {
        case 'ISTJ':
            result.mbti.push('Finance', 'Pre-Dental', 'Geology')
            break
        case 'INFJ':
            result.mbti.push('Graphic Design', 'Library Sciences', 'Psychology')
            break
        case 'INTJ':
            result.mbti.push('Computer Science', 'Software Design', 'Engineering')
            break
        case 'ISTP':
            result.mbti.push('Mathematical Science', 'Forestry', 'Telecommunications')
            break
        case 'ISFP':
            result.mbti.push('English', 'Interior Design', 'Culinary Arts')
            break
        case 'INFP':
            result.mbti.push('Architecture', 'History', 'Athletic Training')
            break
        case 'INTP':
            result.mbti.push('Computer Programming', 'Biology', 'Economics')
            break
        case 'ESTP':
            result.mbti.push('Industrial Technology', 'Food Management', 'Fitness')
            break
        case 'ESFP':
            result.mbti.push('Dance Performance', 'Family Studies', 'Insurance')
            break
        case 'ENFP':
            result.mbti.push('Human Resources', 'Sales', 'Theatre')
            break
        case 'ENTP':
            result.mbti.push('Criminal Justice', 'Film', 'Public Relations')
            break
        case 'ESTJ':
            result.mbti.push('Political Science', 'Music Management', 'Industrial Technology')
            break
        case 'ESFJ':
            result.mbti.push('Dietetics', 'Marketing', 'Environmental Studies')
            break
        case 'ENTJ':
            result.mbti.push('Business', 'Construction Management', 'Legal Studies')
            break
        case 'ENFJ':
            result.mbti.push('Education', 'Journalism', 'Social Work')
            break
    }

    switch (req.query.hobby) {
        case 'A creative hobby':
            result.hobby.push('Interior Design', 'Textiles and Apparel', 'Interactive Digital Studies', 'Marketing Management', 'Art Education', 'Advertising and Digital Media')
            break
        case 'A hobby to socialize':
            result.hobby.push('Anthropology', 'Economics & Management', 'History', 'Human Services', 'Political Science', 'Psychology', 'Sociology')
            break
        case 'A hobby to stay in shape':
            result.hobby.push('Exercise science', 'kinesiology', 'Exercise physiology', 'Athletic training', 'Physical therapy', 'Sports communication', 'Sports management', 'Sports and fitness administration', 'Sports studies')
            break
        case 'A hobby to learn':
            result.hobby.push('Biological Engineering', 'Biomedical Engineering', 'Chemical Engineering', 'Civil Engineering', 'Computer Science', 'Earth and Atmospheric Sciences', 'Electrical and Computer Engineering', 'Engineering Physics')
            break
        case 'A hobby that makes money':
            result.hobby.push('Business', 'Economics', 'Accounting', 'Biomedical engineering', 'Mathematics', 'Statistics', 'Finance', 'Nursing', 'Information technology')
            break
    }

    switch (req.query.subject) {
        case 'English Language Arts':
            result.subject.push('Economics', 'Public Relations', 'Linguistics', 'Foreign language', 'International studies', 'History', 'Journalism')
            break
        case 'Social Studies':
            result.subject.push('sociology', 'psychology', 'anthropology', 'economics', 'political science', 'religion', 'management', 'archaeology', 'environmental science', 'marketing')
            break
        case 'Mathematics':
            result.subject.push('Applied math', 'Computer Science')
            break
        case 'Sciences':
            result.subject.push('Agricultural science', 'Animal science', 'Astronomy', 'Biochemistry', 'Bioengineering', 'Biology',  'marine','neurobiology', 'Botany')
            break
    }

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        res.send({ 
            status: true, 
            data: result
        })
        connection.release()
    })
    
}