#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <random>
#include <cmath>
#include <set>
#include <fstream>
#include <sstream>
#include <map>
#include <cctype>

using namespace std;

struct Group
{
    string name;
    int students;
};

struct Teacher
{
    string name;
    string subject;
    vector<string> availability;
};

struct Subject
{
    string name;
    string teacher;
    string group;
    int students;
    int count;
    string roomType;
};

struct Room
{
    string name;
    int capacity;
    string type;
};

struct Assignment
{
    Subject subject;
    string room;
    int day;
    int period;
};

struct Solution
{
    vector<Assignment> a;
    int score;
    int spread;
    int consecutive;
    int workload;
    int room;
};

class TimetableEngine
{
public:
    virtual string engineName() const
    {
        return "Generic Timetable Engine";
    }
    virtual ~TimetableEngine() = default;
};

class SmartTimetableEngine : public TimetableEngine
{
public:
    string engineName() const override
    {
        return "SMART TIMETABLE OPTIMIZATION ENGINE";
    }
};

vector<Group> groups;
vector<Teacher> teachers;
vector<Subject> subjects;
vector<Room> rooms;

vector<string> days = {
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};

int workingDays = 5;
int periodsPerDay = 6;

mt19937 rng(random_device{}());

SmartTimetableEngine engine;
SmartTimetableEngine *enginePtr = &engine;

string trim(string s)
{
    while (!s.empty() && isspace((unsigned char)s.front()))
        s.erase(s.begin());
    while (!s.empty() && isspace((unsigned char)s.back()))
        s.pop_back();
    return s;
}

string lowerString(string s)
{
    for (char &c : s)
        c = tolower((unsigned char)c);
    return s;
}

vector<string> split(const string &line, char delimiter)
{
    vector<string> result;
    string item;
    stringstream ss(line);
    while (getline(ss, item, delimiter))
        result.push_back(trim(item));
    return result;
}

vector<string> split(const string &line)
{
    return split(line, ',');
}

bool teacherAvailable(const string &teacherName, int day)
{
    bool foundTeacher = false;
    for (const auto &teacher : teachers)
    {
        if (teacher.name == teacherName)
        {
            foundTeacher = true;
            string currentDay = lowerString(days[day]);
            for (const auto &available : teacher.availability)
            {
                if (lowerString(available) == currentDay)
                    return true;
                string shortDay = currentDay.substr(0, 3);
                if (lowerString(available) == shortDay)
                    return true;
            }
            return false;
        }
    }
    return foundTeacher;
}

bool loadInput()
{
    ifstream fin("input.txt");
    if (!fin)
    {
        cout << "ERROR: input.txt not found.\nPlace input.txt in the same folder as main.cpp.\n";
        return false;
    }

    groups.clear();
    teachers.clear();
    subjects.clear();
    rooms.clear();

    string line;
    string section = "";

    while (getline(fin, line))
    {
        line = trim(line);
        if (line.empty())
            continue;

        if (line == "GROUPS")
        {
            section = "GROUPS";
            continue;
        }
        if (line == "TEACHERS")
        {
            section = "TEACHERS";
            continue;
        }
        if (line == "SUBJECTS")
        {
            section = "SUBJECTS";
            continue;
        }
        if (line == "ROOMS")
        {
            section = "ROOMS";
            continue;
        }
        if (line == "SETTINGS")
        {
            section = "SETTINGS";
            continue;
        }

        if (section == "GROUPS")
        {
            vector<string> data = split(line);
            if (data.size() >= 2)
            {
                Group g;
                g.name = data[0];
                g.students = stoi(data[1]);
                groups.push_back(g);
            }
        }
        else if (section == "TEACHERS")
        {
            vector<string> data = split(line);
            if (data.size() >= 3)
            {
                Teacher t;
                t.name = data[0];
                t.subject = data[1];
                for (size_t i = 2; i < data.size(); i++)
                {
                    t.availability.push_back(data[i]);
                }
                teachers.push_back(t);
            }
        }
        else if (section == "SUBJECTS")
        {
            vector<string> data = split(line);
            if (data.size() >= 5)
            {
                Subject s;
                s.name = data[0];
                s.teacher = data[1];
                s.count = stoi(data[2]);
                s.group = data[3];
                s.roomType = data[4];
                s.students = 0;

                for (const auto &g : groups)
                {
                    if (g.name == s.group)
                    {
                        s.students = g.students;
                        break;
                    }
                }
                subjects.push_back(s);
            }
        }
        else if (section == "ROOMS")
        {
            vector<string> data = split(line);
            if (data.size() >= 3)
            {
                Room r;
                r.name = data[0];
                r.capacity = stoi(data[1]);
                r.type = data[2];
                rooms.push_back(r);
            }
        }
        else if (section == "SETTINGS")
        {
            vector<string> data = split(line);
            if (data.size() >= 2)
            {
                workingDays = stoi(data[0]);
                periodsPerDay = stoi(data[1]);
            }
        }
    }

    fin.close();

    cout << "\n========================================\n";
    cout << "INPUT DATA LOADED\n";
    cout << "========================================\n";
    cout << "Groups        : " << groups.size() << "\n";
    cout << "Teachers      : " << teachers.size() << "\n";
    cout << "Subjects      : " << subjects.size() << "\n";
    cout << "Rooms         : " << rooms.size() << "\n";
    cout << "Working Days  : " << workingDays << "\n";
    cout << "Periods/Day   : " << periodsPerDay << "\n";
    cout << "========================================\n\n";

    if (groups.empty())
    {
        cout << "ERROR: No groups found.\n";
        return false;
    }
    if (subjects.empty())
    {
        cout << "ERROR: No subjects found.\n";
        return false;
    }
    if (rooms.empty())
    {
        cout << "ERROR: No rooms found.\n";
        return false;
    }
    return true;
}

bool roomSuitable(const Subject &subject, const Room &room)
{
    if (room.capacity < subject.students)
        return false;
    if (lowerString(room.type) != lowerString(subject.roomType))
        return false;
    return true;
}

bool roomSuitable(const Subject *subject, const Room *room)
{
    if (subject == nullptr || room == nullptr)
        return false;
    if (room->capacity < subject->students)
        return false;
    if (lowerString(room->type) != lowerString(subject->roomType))
        return false;
    return true;
}

bool sameTime(const Assignment &a, const Assignment &b)
{
    return a.day == b.day && a.period == b.period;
}

bool validAssignment(const Assignment &x, const vector<Assignment> &assignments)
{
    if (!teacherAvailable(x.subject.teacher, x.day))
        return false;

    int roomID = -1;
    for (size_t i = 0; i < rooms.size(); i++)
    {
        if (rooms[i].name == x.room)
        {
            roomID = i;
            break;
        }
    }
    if (roomID == -1)
        return false;
    if (!roomSuitable(x.subject, rooms[roomID]))
        return false;

    for (const auto &y : assignments)
    {
        if (!sameTime(x, y))
            continue;
        if (x.subject.group == y.subject.group)
            return false;
        if (x.subject.teacher == y.subject.teacher)
            return false;
        if (x.room == y.room)
            return false;
    }
    return true;
}

string chooseRoom(const Subject &subject, const vector<Assignment> &assignments, int day, int period)
{
    vector<string> possible;
    for (auto &room : rooms)
    {
        Subject *subjectPtr = const_cast<Subject *>(&subject);
        Room *roomPtr = &room;
        if (!roomSuitable(subjectPtr, roomPtr))
            continue;
        bool occupied = false;
        for (const auto &x : assignments)
        {
            if (x.day == day && x.period == period && x.room == room.name)
            {
                occupied = true;
                break;
            }
        }
        if (!occupied)
            possible.push_back(room.name);
    }
    if (possible.empty())
        return "";
    return possible[rng() % possible.size()];
}

int countSubject(const vector<Assignment> &a, const string &subjectName, const string &group)
{
    int count = 0;
    for (const auto &x : a)
    {
        if (x.subject.name == subjectName && x.subject.group == group)
            count++;
    }
    return count;
}

int countSubjectOnDay(const vector<Assignment> &a, const string &subjectName, const string &group, int day)
{
    int count = 0;
    for (const auto &x : a)
    {
        if (x.subject.name == subjectName && x.subject.group == group && x.day == day)
            count++;
    }
    return count;
}

int countGroupOnDay(const vector<Assignment> &a, const string &group, int day)
{
    int count = 0;
    for (const auto &x : a)
    {
        if (x.subject.group == group && x.day == day)
            count++;
    }
    return count;
}

bool groupHasPeriod(const vector<Assignment> &a, const string &group, int day, int period)
{
    for (const auto &x : a)
    {
        if (x.subject.group == group && x.day == day && x.period == period)
            return true;
    }
    return false;
}

int calculateSpread(const vector<Assignment> &a)
{
    set<int> usedDays;
    for (const auto &x : a)
        usedDays.insert(x.day);
    return min(30, (int)usedDays.size() * 6);
}

int calculateConsecutive(const vector<Assignment> &a)
{
    int penalty = 0;
    for (size_t i = 0; i < a.size(); i++)
    {
        for (size_t j = i + 1; j < a.size(); j++)
        {
            if (a[i].subject.group == a[j].subject.group && a[i].day == a[j].day)
            {
                int difference = abs(a[i].period - a[j].period);
                if (difference == 1)
                    penalty += 3;
                else if (difference == 2)
                    penalty += 1;
            }
        }
    }
    return max(0, 25 - min(25, penalty));
}

int calculateWorkload(const vector<Assignment> &a)
{
    int score = 25;
    for (int d = 0; d < workingDays; d++)
    {
        int count = 0;
        for (const auto &x : a)
        {
            if (x.day == d)
                count++;
        }
        if (count > 7)
            score -= 5;
        if (count == 0)
            score -= 4;
    }
    return max(0, min(25, score));
}

int calculateRoom(const vector<Assignment> &a)
{
    int correct = 0;
    for (const auto &x : a)
    {
        for (const auto &room : rooms)
        {
            if (room.name == x.room)
            {
                if (roomSuitable(x.subject, room))
                    correct++;
                break;
            }
        }
    }
    if (a.empty())
        return 0;
    return min(20, correct * 20 / (int)a.size());
}

bool verifyPeriodCounts(const vector<Assignment> &a)
{
    for (const auto &s : subjects)
    {
        int actual = countSubject(a, s.name, s.group);
        if (actual != s.count)
            return false;
    }
    return true;
}

Solution evaluate(const vector<Assignment> &a)
{
    Solution s;
    s.a = a;
    s.spread = calculateSpread(a);
    s.consecutive = calculateConsecutive(a);
    s.workload = calculateWorkload(a);
    s.room = calculateRoom(a);
    s.score = s.spread + s.consecutive + s.workload + s.room;
    return s;
}

bool createSolution(Solution &result)
{
    vector<Assignment> assignments;
    vector<Subject> orderedSubjects = subjects;

    sort(orderedSubjects.begin(), orderedSubjects.end(), [](const Subject &a, const Subject &b)
         { return a.count > b.count; });

    for (const auto &subject : orderedSubjects)
    {
        for (int k = 0; k < subject.count; k++)
        {
            vector<pair<int, int>> slots;
            for (int d = 0; d < workingDays; d++)
            {
                for (int p = 1; p <= periodsPerDay; p++)
                {
                    slots.push_back({d, p});
                }
            }
            shuffle(slots.begin(), slots.end(), rng);

            int bestDay = -1;
            int bestPeriod = -1;
            string bestRoom = "";
            int bestScore = -100000;

            for (auto slot : slots)
            {
                int day = slot.first;
                int period = slot.second;

                if (!teacherAvailable(subject.teacher, day))
                    continue;
                if (countSubjectOnDay(assignments, subject.name, subject.group, day) >= 2)
                    continue;
                if (countGroupOnDay(assignments, subject.group, day) >= periodsPerDay)
                    continue;
                if (groupHasPeriod(assignments, subject.group, day, period))
                    continue;

                string room = chooseRoom(subject, assignments, day, period);
                if (room.empty())
                    continue;

                Assignment x{subject, room, day, period};
                if (!validAssignment(x, assignments))
                    continue;

                int localScore = 0;
                if (countSubjectOnDay(assignments, subject.name, subject.group, day) == 0)
                    localScore += 20;

                int groupCount = countGroupOnDay(assignments, subject.group, day);
                if (groupCount == 0)
                    localScore += 12;
                else if (groupCount == 1)
                    localScore += 8;
                else if (groupCount == 2)
                    localScore += 4;

                for (const auto &y : assignments)
                {
                    if (y.subject.group == subject.group && y.day == day)
                    {
                        int difference = abs(y.period - period);
                        if (difference == 1)
                            localScore -= 25;
                        else if (difference == 2)
                            localScore -= 5;
                    }
                }

                localScore += rng() % 5;
                if (localScore > bestScore)
                {
                    bestScore = localScore;
                    bestDay = day;
                    bestPeriod = period;
                    bestRoom = room;
                }
            }

            if (bestDay == -1)
                return false;
            assignments.push_back({subject, bestRoom, bestDay, bestPeriod});
        }
    }

    if (!verifyPeriodCounts(assignments))
        return false;
    result = evaluate(assignments);
    return true;
}

bool better(const Solution &a, const Solution &b)
{
    return a.score > b.score;
}

bool isDuplicate(const Solution &a, const Solution &b)
{
    if (a.a.size() != b.a.size())
        return false;
    for (size_t i = 0; i < a.a.size(); i++)
    {
        if (a.a[i].subject.name != b.a[i].subject.name)
            return false;
        if (a.a[i].subject.group != b.a[i].subject.group)
            return false;
        if (a.a[i].day != b.a[i].day)
            return false;
        if (a.a[i].period != b.a[i].period)
            return false;
        if (a.a[i].room != b.a[i].room)
            return false;
    }
    return true;
}

void printTimetable(const Solution &solution)
{
    cout << "\n========================================\n";
    cout << "FINAL OPTIMIZED TIMETABLE\n";
    cout << "========================================\n\n";

    for (const auto &group : groups)
    {
        cout << group.name << " TIMETABLE\n";
        cout << "----------------------------------------\n";
        for (int d = 0; d < workingDays; d++)
        {
            cout << "\n"
                 << days[d] << "\n";
            for (int p = 1; p <= periodsPerDay; p++)
            {
                bool found = false;
                for (const auto &x : solution.a)
                {
                    if (x.subject.group == group.name && x.day == d && x.period == p)
                    {
                        cout << "P" << p << " : " << x.subject.name << " | " << x.subject.teacher << " | " << x.room << "\n";
                        found = true;
                        break;
                    }
                }
                if (!found)
                {
                    cout << "P" << p << " : Free\n";
                }
            }
        }
        cout << "\n";
    }
}

void writeOutput(const Solution &solution)
{
    ofstream fout("output.txt");
    if (!fout)
    {
        cout << "ERROR: Cannot create output.txt\n";
        return;
    }

    fout << "GROUP,DAY,PERIOD,SUBJECT,TEACHER,ROOM\n";
    for (const auto &x : solution.a)
    {
        fout << x.subject.group << "," << days[x.day] << "," << x.period << ","
             << x.subject.name << "," << x.subject.teacher << "," << x.room << "\n";
    }
    fout.close();
    cout << "\noutput.txt generated successfully.\n";
}

void printPeriodSummary(const Solution &solution)
{
    cout << "\n========================================\n";
    cout << "PERIOD REQUIREMENT SUMMARY\n";
    cout << "========================================\n";
    for (const auto &s : subjects)
    {
        int generated = countSubject(solution.a, s.name, s.group);
        cout << s.group << " | " << s.name << " | Required = " << s.count << " | Generated = " << generated;
        if (generated == s.count)
            cout << " | PASS\n";
        else
            cout << " | FAIL\n";
    }
}

int main()
{
    TimetableEngine *basePtr = enginePtr;
    cout << "========================================\n";
    cout << basePtr->engineName() << "\n";
    cout << "========================================\n";

    if (!loadInput())
        return 0;

    vector<Solution> solutions;
    int validSolutions = 0;
    int attempts = 0;
    const int targetSolutions = 100;
    const int maxAttempts = 5000;

    while (validSolutions < targetSolutions && attempts < maxAttempts)
    {
        attempts++;
        Solution s;
        if (!createSolution(s))
            continue;
        validSolutions++;

        bool duplicate = false;
        for (const auto &old : solutions)
        {
            if (isDuplicate(old, s))
            {
                duplicate = true;
                break;
            }
        }
        if (!duplicate)
        {
            solutions.push_back(s);
            sort(solutions.begin(), solutions.end(), better);
            if (solutions.size() > 5)
            {
                solutions.pop_back();
            }
        }
    }

    if (solutions.empty())
    {
        cout << "\nNo valid timetable found.\n";
        cout << "Possible reasons:\n";
        cout << "1. Teacher availability is too restrictive.\n";
        cout << "2. Room capacity is insufficient.\n";
        cout << "3. Room type does not match subject.\n";
        cout << "4. Too many periods are requested.\n";
        return 0;
    }

    sort(solutions.begin(), solutions.end(), better);

    cout << "\nBEST SCORE: " << solutions[0].score << "/100\n";
    printTimetable(solutions[0]);
    printPeriodSummary(solutions[0]);
    writeOutput(solutions[0]);

    cout << "\n========================================\n";
    cout << "SEARCH SUMMARY\n";
    cout << "========================================\n";
    cout << "Valid Solutions Found : " << validSolutions << "\n";
    cout << "Search Attempts       : " << attempts << "\n";
    cout << "Solutions Stored      : " << solutions.size() << "\n";
    cout << "========================================\n";
    cout << "PROGRAM END\n";
    cout << "========================================\n";

    return 0;
}