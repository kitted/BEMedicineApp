import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ID } from 'src/core/interfaces/id.interface';
import { Patients } from './schemas/patient.schema';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { QueryDto, sortTypeEnum } from 'src/core/dtos/query.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patients)
    private readonly patientModel: ReturnModelType<typeof Patients>,
  ) {}

  async getTest() {
    return 'abc';
  }

  async findById(id: ID | string) {
    return await this.patientModel.findById(id);
  }

  async findByPhone(phoneNumber: string) {
    return await this.patientModel.find({ phoneNumber });
  }

  async create(payload: CreatePatientDto) {
    const phoneCheck = await this.findByPhone(payload.phoneNumber);
    if (phoneCheck && phoneCheck.length > 0) {
      throw new BadRequestException('Bệnh nhân đã tồn tại trong hệ thống!');
    }
    return await this.patientModel.create(payload);
  }

  async findPatient(query: QueryDto) {
    const size = query.limit ? +query.limit : 10;
    const page = query.page ? +query.page : 1;
    const sortBy = query.sortBy;
    const sortType = query.sortType === sortTypeEnum.desc ? -1 : 1;

    let tmp = [];

    tmp = [
      ...tmp,
      {
        $match: {
          isDeleted: false,
        },
      },
    ];

    if (query.searchBy !== undefined && query.searchBy.length > 0) {
      tmp = [
        ...tmp,
        {
          $match: {
            $or: [
              {
                username: {
                  $regex: '.*' + (query.searchBy || '') + '.*',
                  $options: 'i',
                },
              },
              {
                phoneNumber: {
                  $regex: '.*' + (query.searchBy || '') + '.*',
                  $options: 'i',
                },
              },
            ],
          },
        },
      ];
    }

    if (sortBy && sortType) {
      tmp = [
        ...tmp,
        {
          $sort: {
            [sortBy]: sortType,
          },
        },
      ];
    }

    tmp = [
      ...tmp,
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [
            { $skip: (page - 1) * size },
            { $limit: size },
            { $sort: { [sortBy]: sortType } },
          ],
        },
      },
    ];

    const result = await this.patientModel.aggregate(tmp);
    const count = result[0]?.metadata?.[0]?.total || 0;
    const items = result[0].data;
    return {
      items: items,
      paginate: {
        page,
        size,
        count,
      },
    };
  }
}
