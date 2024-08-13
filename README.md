# Wanted Pre-Onboarding Backend 사전과제

## 구현 기능
#### 1. 채용공고를 등록합니다.
#### 2. 채용공고를 수정합니다.
#### 3. 채용공고를 삭제합니다.

#### 4. 채용공고 목록을 가져옵니다.
-  4-1. 사용자는 채용공고 목록을 확인할 수 있습니다.
#### 5. 채용 상세 페이지를 가져옵니다.
- “채용내용”이 추가적으로 담겨있음.
- 해당 회사가 올린 다른 채용공고 가 추가적으로 포함됩니다**(선택사항 및 가산점요소).**

## 사용 언어 및 프레임워크
#### Javascript & Node.js

## 라이브러리
- express
- mysql2
- sequelize
- jest
- supertest
  

## DB
#### 1. 'job_postings' TABLE
```
CREATE TABLE `job_postings` (
    `id` int NOT NULL AUTO_INCREMENT,
    `company_id` int NOT NULL,
    `position` varchar(255) NOT NULL,
    `reward` int DEFAULT NULL,
    `description` text,
    `tech_stack` varchar(255) DEFAULT NULL,
    `created_at` datetime DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `company_id` (`company_id`),
    CONSTRAINT `job_postings_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci
```
#### 2. 'companies' TABLE
```
CREATE TABLE `companies` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `country` varchar(100) NOT NULL,
    `location` varchar(100) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci
```


## 테스트 방법
### Jest, Supertest 기반 유닛테스트
1. ```$ npm install```
2. ```$ npm test```
### cURL 테스트
1. ```$ npm install```
2. ```$ npm start```
3. cURL 코드로 테스트
cURL을 사용하여 `Job Postings API`의 각 엔드포인트를 테스트할 수 있는 명령어를 작성해드리겠습니다. 각 명령어는 위에 제공된 테스트 케이스와 대응됩니다.

    2-1. 채용공고를 등록합니다 (POST /job-postings)
  
    ```bash
    curl -X POST http://localhost:3000/job-postings \
    -H "Content-Type: application/json" \
    -d '{
      "company_id": 1,
      "position": "백엔드 주니어 개발자",
      "reward": 1000000,
      "description": "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
      "tech_stack": "Python"
    }'
    ```
    
    2-2. 채용공고를 수정합니다 (PATCH /job-postings/:id)
    
    -  보상금과 설명을 수정합니다.
    
    ```bash
    curl -X PATCH http://localhost:3000/job-postings/1 \
    -H "Content-Type: application/json" \
    -d '{
      "position": "백엔드 주니어 개발자",
      "reward": 1500000,
      "description": "원티드랩에서 백엔드 주니어 개발자를 적극 채용합니다. 자격요건은..",
      "tech_stack": "Python"
    }'
    ```

    - 사용 기술 스택을 수정합니다.
    
    ```bash
    curl -X PATCH http://localhost:3000/job-postings/1 \
    -H "Content-Type: application/json" \
    -d '{
      "position": "백엔드 주니어 개발자",
      "reward": 1000000,
      "description": "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
      "tech_stack": "Django"
    }'
    ```

    2-3. 채용공고를 삭제합니다 (DELETE /job-postings/:id)
    
    ```bash
    curl -X DELETE http://localhost:3000/job-postings/1 \
    -H "Accept: application/json"
    ```
    
    2-4. 채용공고 목록을 가져옵니다 (GET /job-postings)
    
    ```bash
    curl -X GET http://localhost:3000/job-postings \
    -H "Accept: application/json"
    ```
    
    2-5. 채용 상세 페이지를 가져옵니다 (GET /job-postings/:id)
    
    ```bash
    curl -X GET http://localhost:3000/job-postings/1 \
    -H "Accept: application/json"
    ```
