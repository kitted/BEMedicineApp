import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Profiles } from './schemas/profile.schema';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { ID } from 'src/core/interfaces/id.interface';
import { PatientService } from '../patient/patient.service';
import { QueryDto, sortTypeEnum } from 'src/core/dtos/query.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profiles)
    private readonly profileModel: ReturnModelType<typeof Profiles>,
    private readonly patientService: PatientService,
  ) {}

  async getTest() {
    return 'abc';
  }
  async findById(id: ID | string) {
    return await this.profileModel.findById(id);
  }

  async create(dto: CreateProfileDto) {
    const patient = await this.patientService.findById(dto.patient);
    if (!patient) {
      throw new BadRequestException('Không tìm thấy thông tin bệnh nhân!');
    }
    const newUser = new this.profileModel(dto);
    const created: any = await newUser.save();
    return await this.findById(created._id);
  }

  async findByPatient(id: ID | string, query: QueryDto) {
    const size = query.limit ? +query.limit : 1000;
    const page = query.page ? +query.page : 1;
    const sortBy = query.sortBy;
    const sortType = query.sortType === sortTypeEnum.desc ? -1 : 1;

    let tmp = [];

    tmp = [
      ...tmp,
      {
        $match: {
          isDeleted: false,
          $expr: { $eq: ['$patient', { $toObjectId: id }] },
        },
      },
    ];
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

    const result = await this.profileModel.aggregate(tmp);
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

  async delete(id: ID | string) {
    return await this.profileModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      {
        new: true,
      },
    );
  }
}
