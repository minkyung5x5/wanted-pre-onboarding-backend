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
  
### 테스트 방법
#### Jest, Supertest 기반 유닛테스트
1. ```$ npm test```
#### cURL 테스트
1. ```$ npm test```
2. 

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
``` CREATE TABLE `companies` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `country` varchar(100) NOT NULL,
    `location` varchar(100) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ```
